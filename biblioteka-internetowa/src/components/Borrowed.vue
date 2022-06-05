<template>
<div>
    <h4>Twoje wypożyczone książki:</h4>
    <div v-for="book of borrowedBooks" :key="book.id" id='book'>
            <BorrowedBook :borrowDate="book.borrowDate" :returnDate="book.returnDate" :bookId="book.bookId"/>
            <button @click="returnBook(book.bookId)">Zwróć</button>
    </div>

   
</div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import BorrowedBook from "./BorrowedBook.vue"
    import Queue from '../queue';
    const props = defineProps(["userId", "borrowed"])
    const borrowedBooks =ref([])
    const borrowedDB = ref([])
    const nullObj = ref(null)
    
    let currentDate = new Date()
    let borrowDate = firebase.firestore.Timestamp.fromDate(currentDate)
        
    currentDate.setMonth(currentDate.getMonth()+1)

    let returnDate = firebase.firestore.Timestamp.fromDate(currentDate)
     
    onMounted(()=>{
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
   
    function returnBook(bookId){
        var ready = false
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
            ready = true
        }).then(()=>{ 
            db.collection('users').doc(props.userId).update({
                borrowed: borrowedBooks.value      
           })
           
        }).then(()=>{
                db.collection('books').doc(bookId).update({
                   copies: firebase.firestore.FieldValue.arrayRemove(bookDate)
                })
                db.collection('books').doc(bookId).update({
                    copies: firebase.firestore.FieldValue.arrayUnion('')
                })
           }).then(()=>{
            db.collection('books').doc(bookId).get().then((doc)=>{
                if(doc.data().queue.length > 0){
                    for (let b of doc.data().queue){
                        if(doc.data().copies.includes('') | doc.data().copies.includes(null)){
                            db.collection('books').doc(bookId).update({
                                queue: firebase.firestore.FieldValue.arrayRemove(b)
                            }).then(()=>{
                                db.collection('books').doc(bookId).update({
                                    copies: firebase.firestore.FieldValue.arrayUnion(borrowDate)
                                }).then(()=>{
                                    db.collection('users').doc(b).update({
                                        borrowed: firebase.firestore.FieldValue.arrayUnion({bookId:bookId, borrowDate:borrowDate, returnDate:returnDate})  
                                   })
                                })
                            })
                            }
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