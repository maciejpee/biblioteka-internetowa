<template>
    <div v-if="series.length > 0">
      <h4>Książki o podobnej tematyce ({{ genre }})</h4>
      <div class="row justify-content-center">
        <div v-for="b of series.slice(0, 6)" class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 py-2">
          <div class="card h-100" @click="pageReload(b.id)">
            <img :src=b.cover class="card-img cover-small">
            <span>{{ b.title }}</span>
            <span>Tom {{ b.volume }}</span>
            <span>{{ b.author }}</span>
          </div>
        </div>
      </div><hr>
    </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const props = defineProps(["bookSeries", "genre"])

  const series = ref([])

  onMounted(() => {
    db.collection('books').where('genre', 'array-contains', props.genre).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.data().series != props.bookSeries) {
          const data = {
            'id': doc.id,
            'title': doc.data().title,
            'author': doc.data().author,
            'cover': doc.data().cover,
            'volume': doc.data().volume,
          }
          series.value.push(data)
        }
      })
      series.value.sort(function(a,b){
        return a.volume - b.volume
      })
    })
  })

  function pageReload(id) {
    window.location.replace('/details/' + id)
  }
</script>