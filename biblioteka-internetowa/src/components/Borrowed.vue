<template>
<div>
    <h4 class="profile-title-list">Twoje wypożyczone książki:</h4>
    <div class="row align-items-center" v-for="book of borrowedBooks" :key="book.id" id='book'>
        
        <BorrowedBook :borrowDate="book.borrowDate" :returnDate="book.returnDate" :bookId="book.bookId"/>
        
        <div class="col-md-2">
            <button class="btn btn-success shadow-none" @click="returnBook(book.bookId)">Zwróć</button>
        </div>
            <hr class="list">
    </div>

   
</div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import BorrowedBook from "./BorrowedBook.vue"
    const props = defineProps(["userId", "borrowed"])
    const borrowedBooks = ref([])
    const waitingBooks = ref([])

    let currentDate = new Date()
    let borrowDate = firebase.firestore.Timestamp.fromDate(currentDate)
        
    currentDate.setMonth(currentDate.getMonth()+1)

    let returnDate = firebase.firestore.Timestamp.fromDate(currentDate)
     
    onMounted(()=>{
        // wyswietlanie pozyczonych książek
        for (let b of props.borrowed){
            db.collection('books').doc(b.bookId).get().then((doc)=>{
                var data = {
                    'bookId': b.bookId,
                    'borrowDate': b.borrowDate,
                    'returnDate': b.returnDate,
                }
                borrowedBooks.value.push(data)
            })
        }
    })
   
    // oddanie książki (i ew. wypożyczenie następnej osobie w kolejce)
    function returnBook(bookId){ // przyjmuje id z przycisku "zwróć"
        var bookDate = null
        
        db.collection('users').doc(props.userId).get().then((doc)=>{
            borrowedBooks.value = []
            for (let b of doc.data().borrowed){
            
                if (b.bookId == bookId){
                    bookDate = b.borrowDate
                    continue
                }
                var data = {
                        bookId: b.bookId,
                        borrowDate: b.borrowDate,
                        returnDate: b.returnDate
                    }
                borrowedBooks.value.push(data)
            }
        }).then(()=>{
            // generator unique id dla obiektów w obiekcie user_history
            let unique_id = "id" + Math.random().toString(16).slice(2) 
            db.collection('users').doc(props.userId).update({
                borrowed: borrowedBooks.value,
                [`borrow_history.${unique_id}.bookId`]: bookId,
                [`borrow_history.${unique_id}.borrowDate`]: bookDate,
                [`borrow_history.${unique_id}.returnedDate`]: borrowDate,
                [`borrow_history.${unique_id}.paid`]: 0, // 0 - brak kary
                
                
                  
           })
           // zwiększanie ilości dostępnych egzemplarzy po oddaniu o 1
        }).then(()=>{
                db.collection('books').doc(bookId).update({
                   copies: firebase.firestore.FieldValue.arrayRemove(bookDate)
                })
                db.collection('books').doc(bookId).update({
                    copies: firebase.firestore.FieldValue.arrayUnion('')
                })
           }).then(()=>{ 
            db.collection('books').doc(bookId).get().then((doc)=>{
            
                if(doc.data().queue.length > 0){ // sprawdzanie czy ktoś czeka w kolejce
                    

                        var b = doc.data().queue[0] 

                        if(doc.data().copies.includes('') || doc.data().copies.includes(null)){ 
                        
                            db.collection('books').doc(bookId).update({ 
                                queue: firebase.firestore.FieldValue.arrayRemove(b) // usunięcie 1 osoby z kolejki
                            }).then(()=>{
                                db.collection('books').doc(bookId).update({ 
                                
                                    copies: firebase.firestore.FieldValue.arrayUnion(borrowDate),
                                }).then(()=>{
                                
                                    
                                    db.collection('books').doc(bookId).update({
                                        copies: firebase.firestore.FieldValue.arrayRemove('')
                                })
                                }).then(()=>{
                                    db.collection('users').doc(b).update({ 
                                    
                                    
                                    
                                            // dodanie książki do "wypożyczonych" użytkownika
                                            borrowed: firebase.firestore.FieldValue.arrayUnion({bookId:bookId, borrowDate:borrowDate, returnDate:returnDate})  
                                })
                                    db.collection('users').doc(b).update({
                                        waiting: firebase.firestore.FieldValue.arrayRemove(bookId) // usunięcie książki z "oczekujących" użytkownika
                                        })
                                })
                                
                            })
                                
                        }
                        
                      
                }
            })
        })
        
    }

    function getRealDate(date) {
      var realDate = new Date(date * 1000)
      return realDate.getDate() + '/' + (realDate.getMonth() + 1) + '/' + realDate.getFullYear()
    }
</script>

<style scoped>
</style>