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

    const genres = ref(['fantasy', 'thriller', 'literatura piękna'])

</script>


<style scoped>
</style>