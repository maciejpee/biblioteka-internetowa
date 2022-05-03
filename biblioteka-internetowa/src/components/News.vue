<template>
  <div id="mainDiv">
    <div v-for="n of news" :key="n.id">
      <div id="newsCard">
        <h3>{{n.title}}</h3>
        <span>{{n.about}}, {{getRealDate(n.date.seconds)}}</span>
        <p>{{n.content}}</p>
        <div id="tags">tagi: {{tagsHandler(n.tags)}}</div>
      </div>
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
    getRealDate(thing) {
      var realDate = new Date(thing * 1000)
      return realDate.getDate() + '/' + (realDate.getMonth() + 1) + '/' + realDate.getFullYear()
    },
    tagsHandler(tagsList){
        return tagsList.join([', '])
    },
  }
}

</script>

<style>

#newsCard {
  border:solid 5px black;
  width: 100%;
}

</style>