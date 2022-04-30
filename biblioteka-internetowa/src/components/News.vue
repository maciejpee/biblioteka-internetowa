<template>
  <div id="mainDiv">
    <div v-for="n of news" id="newsCard">
      <h3>{{n.title}}</h3>
      <span>{{n.about}}</span>
      <p>{{n.content}}</p>
    </div>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      news: [],
    }
  },
  created() {
    db.collection('news').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        const data = {
          'id': doc.id,
          'title': doc.data().title,
          'about': doc.data().about,
          'content': doc.data().content,
          'tags': doc.data().tags,
          'date':doc.data().date

          }
        this.news.push(data)
      })
    })
  },
  methods: {
    getDate(timestamp) {
      var realDate = new Date(timestamp).toLocalDateString("pl-PL")
      return realDate
    }
  }
}

console.log('h')
</script>

<style>

#newsCard {
  border:solid 5px black;
  width: 100%;
}

</style>