<template>
    <div>
      <h4>{{ genre.charAt(0).toUpperCase() + genre.slice(1) }}</h4>
      <div class="row justify-content-center">
        <div v-for="b of genreBooks" :key="b" class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 py-2">
          <router-link :to="{name:'Details', params:{bookId: b.id}}" custom v-slot="{ navigate }">
          <div class="card h-100" role="link" @click="navigate">
            <img :src=b.cover class="card-img cover-small">
            
            <div class="card-body">
              <text class="card-title">{{ b.title }}</text>
            </div>
        
            <div class="card-footer">
              <text class="card-author">{{ b.author }}</text>
            </div>
          </div>
          </router-link>
        </div>
      </div><hr>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps(["genre"])
    const genreBooks = ref([])

    onMounted(() => {
      db.collection('books').where("genre", "array-contains", props.genre).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          if (doc.data().series) {
            if (doc.data().volume == 1) {
              var data = {
              'id': doc.id,
            }
            genreBooks.value.push(data)
            }
          } else {
            var data = {
              'id': doc.id,
            }
            genreBooks.value.push(data)
          } 
            
        })
        console.log(props.genre, genreBooks.value)
      })
    })

</script>


<style scoped>

.card-author {
  font-size: 12px;
  margin: 0px 5px 8px 5px;
}

.card-footer {
  text-align: center;
}

.card-body {
  text-align: center;
}

.card-title {
  font-size: 15px;
	letter-spacing: 0.4px;
  margin: 8px;
  font-family: 'Ubuntu, Times New Roman';
	letter-spacing: 0.5px;
  font-weight: 600;
}
</style>