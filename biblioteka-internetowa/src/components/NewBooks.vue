<template>
    <div>
      <h4 class="genre-title">Nowości</h4>
      <div class="row justify-content-center">
        <div v-for="b of newBooks" :key="b" class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 py-2">
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
      </div><hr>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const newBooks = ref([])

    onMounted(() => {
      db.collection('books').where("release_year", "==", 2022).limit(6).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          var data = {
            'id': doc.id,
            'title': doc.data().title,
            'author': doc.data().author,
            'cover': doc.data().cover,
          }
          newBooks.value.push(data)
        })
        console.log(newBooks.value.length)
      })
    })

</script>


<style scoped>

</style>