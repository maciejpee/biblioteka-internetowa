<template>
    <div class="row">
        <div class="col-md-2">
            <img :src="bookDetails.cover" class="cover" />
        </div>
        <div class="col-md-8">
            <p>{{bookDetails.title}}</p>
            <p>{{bookDetails.author}}</p>
            <p v-if="bookDetails.series">{{bookDetails.series}} Tom {{bookDetails.volume}}</p>
            <p>Wypożyczono: {{getRealDate(props.borrowDate.seconds)}}</p>
            <p>Oczekiwany zwrot: {{getRealDate(props.returnDate.seconds)}}</p>

        </div>
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
      return realDate.getDate() + '/' + (realDate.getMonth() + 1) + '/' + realDate.getFullYear()
    }
</script>

<style>
img.cover {
    width: 80%;
    height: auto;
  }
</style>