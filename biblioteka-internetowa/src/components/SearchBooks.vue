<template>
  <div class="mainDiv">
    <h3 class="title">Wyniki wyszukiwania dla: {{props.sv.replace('-', ' ')}}</h3>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 py-2" v-for="b of filteredBooks" :key="b.id">
          <router-link :to="{name:'Details', params:{bookId: b.id}}" custom v-slot="{ navigate }">
            <div class="card h-100" role="link" @click="navigate">
              <img :src=b.cover class="card-img cover-small">
              <div class="card-body align-items-center d-flex justify-content-center">
                <text class="card-title">{{ b.title }}</text>
              </div>
              <div class="card-footer">
                <text class="card-subtitle">{{ b.author }}</text>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'
    const props = defineProps(['sv'])
    const books = ref([])
    const search = ref(props['sv'])
    const allFilters = ref([])

    onMounted(() => {
    
    db.collection('books').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        const data = {
          'id': doc.id,
          'title': doc.data().title,
          'author': doc.data().author,
          'cover': doc.data().cover,
          'series': doc.data().series,
          'genre': doc.data().genre
        }
        books.value.push(data)
      })
    })
   
    
    })
    
    
     const filteredBooks = computed(() => {
        return books.value.filter((book) => {
          
            var normalizedTitle = book.title.toLowerCase().replace(/ +/g, '')
          
            var normalizedAuthor = book.author.toLowerCase().replace(/ +/g, '')

            var normalizedTags = book.genre.join(' ').toLowerCase().replace(/ +/g, '')
            if (book.series){
              var normalizedSeries = book.series.toLowerCase().replace(/ +/g, '')
              return normalizedTitle.match(search.value.toLowerCase().replace(/ +/g, '')) + normalizedAuthor.match(search.value.toLowerCase().replace(/ +/g, '')) + normalizedSeries.match(search.value.toLowerCase().replace(/ +/g, '')) + normalizedTags.match(search.value.toLowerCase().replace(/ +/g, ''))
              
            }else{          
              return normalizedTitle.match(search.value.toLowerCase().replace(/ +/g, '')) + normalizedAuthor.match(search.value.toLowerCase().replace(/ +/g, '')) + normalizedTags.match(search.value.toLowerCase().replace(/ +/g, ''))
            }
            
            
    })
    
  }) 

</script>


<style scoped>
</style>