<template>
<div class="mainDiv">
    <NewBooks />
    <div v-for="g of genres">
        <GenreBooks :genre="g" />
    </div>
</div>
</template>

<script setup>
    import { ref } from 'vue'
    import GenreBooks from './GenreBooks.vue'
    import NewBooks from './NewBooks.vue'
    const genres = ref(['fantasy', 'kryminał', 'science fiction', 'literatura piękna',  'romans', 'horror', 'popularnonaukowa', 'literatura młodzieżowa', 'literatura faktu'])

</script>


<style scoped>
</style>