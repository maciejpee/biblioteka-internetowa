<template>
<div>
    <h5>Twoje wypożyczone książki:</h5>
    <ul>
        <div id='book'>
            <li v-for="book of borrowedBooks" :key="book.id">
                {{book.title}}, {{ book.author }} <button @click="returnBook(book.bookId)">Zwróć</button> 
            </li>
            
        </div>
    </ul>
   
</div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import Queue from '../queue';
    const props = defineProps(["userId", "bors"])
    const borrowedBooks =ref([])
    const borrowedDB = ref([])
    const nullObj = ref(null)
    
    let currentDate = new Date()
    let borrowDate = firebase.firestore.Timestamp.fromDate(currentDate)
        
    currentDate.setMonth(currentDate.getMonth()+1)

    let returnDate = firebase.firestore.Timestamp.fromDate(currentDate)
     
    onMounted(()=>{
        for (let b of props.bors){
            db.collection('books').doc(b.bookId).get().then((doc)=>{
                var data = {
                    'bookId': b.bookId,
                    'title': doc.data().title,
                    'author': doc.data().author,
                }
                borrowedBooks.value.push(data)
            })

        }
        

    })
    
    function returnBook(bookId){
        var ready = false
        var bookDate = null
        db.collection('users').doc(props.userId).get().then((doc)=>{
            for (let b of doc.data().borrowed){
                if (b.bookId == bookId){
                    bookDate = b.borrowDate
                    continue
                }
                var data = {bookId: b.bookId,
                        borrowDate: b.borrowDate,
                        returnDate: b.returnDate
                    }
                borrowedDB.value.push(data)
                
            }
            ready = true
        }).then(()=>{
            db.collection('users').doc(props.userId).update({
                borrowed: borrowedDB.value    
           }).then(()=>{
                db.collection('books').doc(bookId).update({
                   copies: firebase.firestore.FieldValue.arrayRemove(bookDate)
                })
                db.collection('books').doc(bookId).update({
                    copies: firebase.firestore.FieldValue.arrayUnion('')
                })
           })
        }).then(()=>{
            db.collection('books').doc(bookId).get().then((doc)=>{
                if(doc.data().copies_queue.length > 0){
                    for (let b of doc.data().copies_queue){
                        if(doc.data().copies.includes('') | doc.data().copies.includes(null)){
                            db.collection('books').doc(bookId).update({
                                copies_queue: firebase.firestore.FieldValue.arrayRemove(b)
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
</script>