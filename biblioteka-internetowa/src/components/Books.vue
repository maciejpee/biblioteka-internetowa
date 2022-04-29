<template>
  <div id="mainDiv">
    <h1>Katalog książek</h1>
    <div v-for="b of books">
      <h3 @click="saveID(b.id)">{{ b.title }}</h3>
      <h5>{{ b.author }}</h5>
      <p>{{ b.id }}</p>
    </div>
  </div>
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
          'id': doc.id,
          'title': doc.data().title,
          'author': doc.data().author
          }
        this.books.push(data)
      })
    })
  },
  methods: {
    saveID(id) {
      console.log(id)
      location.assign(location.href + '#' + id)
      location.reload()
    }
  }
}
</script>