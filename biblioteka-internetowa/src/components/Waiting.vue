<template>
    <div>
        <h4 class="profile-title">Twoje oczekujące książki:</h4>
        <div class="row" v-for="w of waitingBooks">
            <div class="col-md-2">
                <img :src="w.cover" class="cover" />
            </div>
            <div class="col-md-8">
                <p><router-link :to="{ name : 'Details', params:{bookId: w.id}}">{{ w.title }}</router-link></p>
                <p>{{w.author}}</p>
                <p v-if="w.series">{{w.series}} Tom {{w.volume}}</p>
                <button @click="leaveQueue(w.id)">Wyjdź z kolejki</button>
            </div>
        </div>  
    </div>
</template>

<script setup>

    import { ref, onMounted } from 'vue'
    
    const props = defineProps(["userId", "waiting"])
    const waitingBooks = ref([])

    onMounted(()=>{
        for (let w of props.waiting) {
            db.collection("books").doc(w).get().then((doc) => {
                var data = {
                    "author": doc.data().author,
                    "title": doc.data().title,
                    "series": doc.data().series,
                    "volume": doc.data().volume,
                    "genre": doc.data().genre,
                    "cover": doc.data().cover,
                    "id": doc.id
                }
                waitingBooks.value.push(data)
            })
        }
    })

    function leaveQueue (bookId) {
        db.collection('users').doc(props.userId).update({
                waiting: firebase.firestore.FieldValue.arrayRemove(bookId)
            })

        db.collection('books').doc(bookId).update({
                queue: firebase.firestore.FieldValue.arrayRemove(props.userId)
            })
    }
   
</script>

