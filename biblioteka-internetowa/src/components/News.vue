<template>
  <div id="mainDiv">
    <div v-for="n of news" :key="n.id">
      <router-link :to="{name:'newsDetails', params:{newsId: n.id}}" custom v-slot="{ navigate }">
        <div id="newsCard" role="link" @click="navigate">
          <h3>{{n.title}}</h3>
          <span>{{n.about}}, {{getRealDate(n.date.seconds)}}</span>
          <p>{{handleLongText(n.content)}}</p>
        </div>
      </router-link>
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
      return realDate.getDate() + '/' + realDate.getMonth() + '/' + realDate.getFullYear()
    },

    handleLongText(content){
       if (content.length > 250) {
         return content.slice(0, 250) + '...'
       }else{
         return content
       }
    }
  }
}

</script>

<style>

#newsCard {
  border:solid 5px black;
  width: 100%;
}

</style>