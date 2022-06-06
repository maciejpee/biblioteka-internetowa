<template>
    <h4 class="profile-title">Twoje ulubione książki:</h4>
    <div class="row" v-for="f of favs">
        <div class="col-md-2">
            <img :src="f.cover" class="cover" />
        </div>
        <div class="col-md-8">
            <p><router-link :to="{ name : 'Details', params:{bookId: f.id}}">{{ f.title }}</router-link></p>
            <p>{{f.author}}</p>
            <p v-if="f.series">{{f.series}} Tom {{f.volume}}</p>
        </div>
    </div>

</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps(["userId", "favs"])
    const favs = ref([])

    onMounted(() => {
        for (let i = 0; i < props.favs.length; i++) {
            db.collection("books").doc(props.favs[i]).get().then((doc) => {
                var data = {
                    "author": doc.data().author,
                    "title": doc.data().title,
                    "series": doc.data().series,
                    "volume": doc.data().volume,
                    "genre": doc.data().genre,
                    "cover": doc.data().cover,
                    "id": doc.id,
                }
                favs.value.push(data)
            })
        }
    })
</script>

<style scoped>
</style>