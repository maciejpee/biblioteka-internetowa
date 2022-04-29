<template>
  <div id="mainDiv">
    <h1>Katalog książek</h1>
    <div v-for="b of books">
      <router-link :to="{name:'Details', params:{bookId: b.id}}" custom v-slot="{ navigate }">
        <div id='bookCard' role="link" @click="navigate">
          <h3>{{ b.title }}</h3>
          <h5>{{ b.author }}</h5>
          <p>{{ b.id }}</p>
        </div>
      </router-link>
    </div>

    <router-link to="/news">NEWS</router-link>
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
      location.assign(location.href + 'details#' + id)
    }
  }
}
</script>


<style>

#bookCard {
  border:solid 5px black;
  width: 25%;
}
</style>