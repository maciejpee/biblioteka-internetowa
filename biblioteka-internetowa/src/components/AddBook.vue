<template>
    <button @click="addBooks">Dodaj książki(nie spamować tego!)</button>
    <p v-for="b of books">Tytuł: {{ b.title }}, autor: {{ b.author }}</p>
</template>

<script>
    import books from './books.js'
    export default {
        data () {
            return {
                books
            }
        },
        methods: {
            addBooks(arr) {
                for (let i=0; i < books._rawValue.length; i++) {
                    db.collection('books').add(books._rawValue[i])
                }
           }
       }
   }
</script>

<style>

</style>