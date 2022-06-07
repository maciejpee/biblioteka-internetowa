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
    import RandomGenre from './RandomGenre.vue';
    //['kryminał', 'fantasy', 'thriller', 'literatura piękna', 'science fiction', 'sensacja', 'pamiętniki', 'biografia', 'autobiografia', 'klasyka', 'popularnonaukowa', 'horror', 'komedia', 'dramat', 'tragedia', 'literatura młodzieżowa']
    const genres = ref()

</script>


<style scoped>
</style>