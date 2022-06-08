<template>
    <div class="col-md-3">
        <img :src="bookDetails.cover" class="cover-list" />
    </div>
    <div class="col-md-7">
        <p><router-link :to="{ name : 'Details', params:{bookId: props.bookId}}">{{ bookDetails.title }}</router-link></p>
        <p class="author-list">{{bookDetails.author}}</p>
        <p v-if="bookDetails.series" class="info-list">{{bookDetails.series}} Tom {{bookDetails.volume}}</p>
        <p class="info-list">Wypożyczono: {{getRealDate(props.borrowDate.seconds)}}</p>
        <p class="info-list">Oczekiwany zwrot: {{getRealDate(props.returnDate.seconds)}}</p>
    </div>
        
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps(["bookId", "borrowDate", "returnDate"])

    const bookDetails = ref({})

    onMounted(() => {
        db.collection("books").doc(props.bookId).get().then((doc) => {
            bookDetails.value["author"] = doc.data().author
            bookDetails.value["title"] = doc.data().title
            bookDetails.value["series"] = doc.data().series
            bookDetails.value["volume"] = doc.data().volume
            bookDetails.value["genre"] = doc.data().genre
            bookDetails.value["cover"] = doc.data().cover
        })
    })

    function getRealDate(date) {
      var realDate = new Date(date * 1000)
      var day = realDate.getDate() < 10 ? "0" + realDate.getDate(): realDate.getDate()
      var month = (realDate.getMonth() + 1) < 10 ? "0" + (realDate.getMonth() + 1): (realDate.getMonth() + 1)
      return day + '/' + month + '/' + realDate.getFullYear()
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