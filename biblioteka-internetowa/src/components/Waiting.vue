<template>
    <h4>Twoje oczekujące książki:</h4>
    <div class="row" v-for="w of waiting">
        <div class="col-md-2">
            <img :src="w.cover" class="cover" />
        </div>
        <div class="col-md-8">
            <p>{{w.title}}</p>
            <p>{{w.author}}</p>
            <p v-if="w.series">{{w.series}} Tom {{w.volume}}</p>
            
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps(["userId", "waiting"])
    const waiting = ref([])

    onMounted(() => {
        for (let i = 0; i < props.waiting.length; i++) {
            db.collection("books").doc(props.waiting[i]).get().then((doc) => {
                var data = {
                    "author": doc.data().author,
                    "title": doc.data().title,
                    "series": doc.data().series,
                    "volume": doc.data().volume,
                    "genre": doc.data().genre,
                    "cover": doc.data().cover,
                }
                waiting.value.push(data)
            })
        }
    })
</script>