<template>
    <h4 class="profile-title">Historia wypożyczeń:</h4>
    <div class="row" v-for="h of history">
        <div class="col-md-2">
            <img :src="h.cover" class="cover" />
        </div>
        <div class="col-md-8">
            <p><router-link :to="{ name : 'Details', params:{bookId: h.id}}">{{ h.title }}</router-link></p>
            <p>{{h.author}}</p>
            <p v-if="h.series">{{h.series}} Tom {{h.volume}}</p>
            <p>Wypożyczono: {{getRealDate(h.borrowDate.seconds)}}</p>
            <p>Zwrócono: {{getRealDate(h.returnedDate.seconds)}}</p>
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