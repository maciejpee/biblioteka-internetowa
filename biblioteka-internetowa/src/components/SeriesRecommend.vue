<template>
    <div v-if="series.length > 0">
      <h4 class="green-link">Inne książki z cyklu <router-link :to="{ name : 'Search', params:{sv: props.bookSeries}}">{{ props.bookSeries }}</router-link></h4>
      <div class="row justify-content-center">
        <div v-for="b of series.slice(0, 6)" :key="b" class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 py-2">
          <div class="card h-100" @click="pageReload(b.id)">
            <img :src=b.cover class="card-img cover-small">
            <div class="card-body align-items-center">
              <text class="card-title">{{ b.title }}</text><br>
              <text class="card-vol">Tom {{ b.volume }}</text>
            </div>
            <div class="card-footer">
              <text class="card-subtitle">{{ b.author }}</text>
            </div>
          </div>
        </div>
      </div><hr class="hr-marg">
    </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const props = defineProps(["bookSeries", "currentBook"])

  const series = ref([])

  onMounted(() => {
    db.collection('books').where('series', '==', props.bookSeries).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.data().title != props.currentBook && doc.data().series != null) {
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

<style scoped>
  .green-link a{
    text-decoration: none;
    cursor: pointer;
    color:#0f7c05;
  }

</style>