<template>
    <div>
        <h4 class="profile-title-list">Historia wypożyczeń:</h4>
        <div class="row align-items-center" v-for="h of history">
            <div class="col-md-3">
                <img :src="h.cover" class="cover-list" />
            </div>
            <div class="col-md-9">
                <p class="title-link"><router-link :to="{ name : 'Details', params:{bookId: h.id}}">{{ h.title }}</router-link></p>
                <p class="author-list">{{h.author}}</p>
                <p v-if="h.series" class="info-list">{{h.series}} Tom {{h.volume}}</p>
                <p class="info-list">Wypożyczono: {{getRealDate(h.borrowDate.seconds)}}</p>
                <p class="info-list">Zwrócono: {{getRealDate(h.returnedDate.seconds)}}</p>
            </div>
            <hr class="list">
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps(["userId", "borrowHistory"])
    const history = ref([])

    onMounted(() => {
        if (props.borrowHistory) {
            for (let value of Object.values(props.borrowHistory)) {
                db.collection("books").doc(value.bookId).get().then((doc) => {
                    var data = {
                        "author": doc.data().author,
                        "title": doc.data().title,
                        "series": doc.data().series,
                        "volume": doc.data().volume,
                        "genre": doc.data().genre,
                        "cover": doc.data().cover,
                        "borrowDate": value.borrowDate,
                        "returnedDate": value.returnedDate,
                        "paid": value.paid,
                        "id": doc.id,
                    }
                    history.value.push(data)
                })
            }
            
        }
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