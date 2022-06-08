<template>
  <div class="mainDiv">
    <h3 class="title">Aktualności</h3>
    <hr>

    <div v-for="n of news" :key="n.id">
      <div id="newsCard">
        <h3 id="newsTitle">{{ n.title }}</h3>
        <p id="newsContent">{{ n.content }}</p>
        <span id="newsDate">{{ n.about }}, {{ getRealDate(n.date.seconds) }}</span>
        <div id="tags">tagi: {{ tagsHandler(n.tags) }}</div>
      </div><hr>
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

<style scoped>
#newsCard {
  width: 100%;
  background-color: #ffffff;
  border: 0;
  margin-bottom: 35px;
  border-radius: 3px;
  padding: 30px 35px 30px 35px;
}

#tags {
  font-size: 13px;
  opacity: 0.8;
}

#newsTitle {
  margin-top: 15px;
  letter-spacing: 1px;
  font-weight: 650;
  font-size: 18px;
  color: #0f7c05;
}

#newsDate {
  font-size: 13px;
  opacity: 0.8;
}

#newsContent {
  margin-top: 16px;
  text-align: justify;
}
hr {
  width:97%;
  margin: auto;
  margin-top: 10px;
  margin-bottom:25px;
}
</style>