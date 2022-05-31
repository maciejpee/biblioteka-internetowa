<template>
    <h5>Twoje ulubione książki:</h5>
    <ul>
        <li v-for="f of favs">{{ f.title }}, {{ f.author }}</li>
    </ul>

</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps(["userId", "favs"])
    const favs = ref([])

    onMounted(() => {
        for (let i = 0; i < props.favs.length; i++) {
            db.collection("books").doc(props.favs[i]).get().then((doc) => {
                var data = {
                    'title': doc.data().title,
                    'author': doc.data().author,
                }
                favs.value.push(data)
            })
        }
    })
</script>