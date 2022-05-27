<template>
  <div id="mainDiv">
    <h1>Katalog książek</h1>
    <div class="container">
      <input class="searchBar" type="text" v-model="search" placeholder="Wyszukaj...">
      <div class="row justify-content-center">  
        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 py-2" v-for="b of filteredBooks" :key="b.id">
          <router-link :to="{name:'Details', params:{bookId: b.id}}" custom v-slot="{ navigate }">
            <div class="card h-100" style="width: 14rem;" role="link" @click="navigate">
              <img :src=b.cover class="card-img cover-small">
              <div class="card-body">
                <p class="card-title">{{ b.title }}</p>
                <p>{{ b.author }}</p>
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
</script>


<style>
img.cover-small {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  }
.card {
	background: #ffffff;
	border: 0;
	border-radius: 8px 8px 8px 8px;
}

.card-title {
	font-size: 18px;
	font-family: 'Ubuntu';
	letter-spacing: 0.8px;
}

.card:hover{
    box-shadow: 4px 2px 2px rgba(0,0,0,0.1);
    transform: scale(1.01);
}

.searchBar{
  text-align: center;
  width: 50%;
  border-radius: 8px 8px 8px 8px;
  margin-left: 25%;
  margin-bottom: 10px;
}


</style>