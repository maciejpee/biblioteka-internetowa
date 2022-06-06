<template>
  <div class="mainDiv">
    <h1>Katalog książek</h1>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 py-2" v-for="b of filteredBooks" :key="b.id">
          <router-link :to="{name:'Details', params:{bookId: b.id}}" custom v-slot="{ navigate }">
            <div class="card h-100" style="width: 14rem;" role="link" @click="navigate">
              <img :src=b.cover class="card-img cover-small">
              <div class="card-body">
                <p class="card-title">{{ b.title }}</p>
                <p class="card-subtitle">{{ b.author }}</p>
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

  const books = ref([])
  const search = ref('')

  onMounted(() => {
    db.collection('books').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        const data = {
          'id': doc.id,
          'title': doc.data().title,
          'author': doc.data().author,
          'cover': doc.data().cover,
        }
        books.value.push(data)
      })
    })
  })

  const filteredBooks = computed(() => {
    return books.value.filter((book) => {
      var normalizedTitle = book.title.toLowerCase().replace(/ +/g, '')
      return normalizedTitle.match(search.value.toLowerCase().replace(/ +/g, ''))
    })
  })

  // na wszelki wypadek - wariacja 1 delayow
  function checkDelays(){
    var currentDate = new Date()
    var today = firebase.firestore.Timestamp.fromDate(currentDate)
    db.collection('users').get().then((snapshot)=>{
      snapshot.docs.forEach(doc =>{
        if(doc.data().borrowed){
          for(let book of doc.data().borrowed){
            if (today.seconds > book.borrowDate.seconds){
              db.collection('users').get(doc.id).update({
                arrears: x
              })
            }
          }
        }
        
      })
    })
  }
  
  

</script>


<style scoped>
</style>