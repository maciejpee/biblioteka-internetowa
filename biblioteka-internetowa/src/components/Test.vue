<template>
  <p v-for="b of books">{{ b.title }} - {{ b.author }}</p>
</template>

<script>
export default {
  data() {
    return {
      books: []
    }
  },
  created() {
    db.collection('books').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        const data = {
          'title': doc.data().title,
          'author': doc.data().author
          }
        this.books.push(data)
      })
    })
  }
}

</script>