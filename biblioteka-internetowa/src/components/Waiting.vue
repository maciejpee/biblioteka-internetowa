<template>
    <div>
        <h4 class="profile-title-list">Twoje oczekujące książki:</h4>
        <div class="row align-items-center" v-for="w of waitingBooks">
            <div class="col-md-3">
                <img :src="w.cover" class="cover-list" />
            </div>
            <div class="col-md-7">
                <p class="title-link"><router-link :to="{ name : 'Details', params:{bookId: w.id}}">{{ w.title }}</router-link></p>
                <p class="author-list">{{w.author}}</p>
                <p class="info-list" v-if="w.series">{{w.series}} Tom {{w.volume}}</p>
            </div>
            <div class="col-md-2">
                <button class="btn btn-success shadow-none" @click="leaveQueue(w.id)">Wyjdź z kolejki</button>
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

    // do przycisku opuszczania kolejki dla danej książki
    function leaveQueue (bookId) {
        db.collection('users').doc(props.userId).update({
                waiting: firebase.firestore.FieldValue.arrayRemove(bookId)
            })

        let bookIndex = waitingBooks.value.indexOf(bookId)
        waitingBooks.value.splice(bookIndex, 1)
        
        db.collection('books').doc(bookId).update({
                queue: firebase.firestore.FieldValue.arrayRemove(props.userId)
            })
    }
   
</script>

<style scoped>
a:link, a:visited{
	text-decoration: none;
	color: #0f7c05;
    font-weight: 600;
}
a:hover, a:active{
  color: #0e6406;
}
</style>