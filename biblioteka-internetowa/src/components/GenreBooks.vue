<template>
    <div>
      <h4>{{ genre.charAt(0).toUpperCase() + genre.slice(1) }}</h4>
      <div class="row justify-content-center">
        <div v-for="b of genreBooks" :key="b" class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 py-2">
          <router-link :to="{name:'Details', params:{bookId: b.id}}" custom v-slot="{ navigate }">
          <div class="card h-100" role="link" @click="navigate">
            <img :src=b.cover class="card-img cover-small">
            <span class="card-title">{{ b.title }}</span>
            <span class="card-subtitle">{{ b.author }}</span>
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
        db.collection('books').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                for (let g of doc.data().genre) {
                    if (g == props.genre) {
                        if (genreBooks.value.length <= 5) {
                            const data = {
                        'id': doc.id,
                        'title': doc.data().title,
                        'author': doc.data().author,
                        'cover': doc.data().cover,
                        }
                        genreBooks.value.push(data)
                        break
                        }
                    }
                }
            })
        })
    })

</script>


<style scoped>
</style>