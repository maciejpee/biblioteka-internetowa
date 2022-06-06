<template>
  <div class="newsDiv">
    <div v-for="n of news" :key="n.id">
      <div id="newsCard">
        <h3 id="newsTitle">{{ n.title }}</h3>
        <p id="newsContent">{{ n.content }}</p>
        <span id="newsDate">{{ n.about }}, {{ getRealDate(n.date.seconds) }}</span>
        <div id="tags">tagi: {{ tagsHandler(n.tags) }}</div>
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

.newsDiv {
  padding: 2.5%;
  height: 80%;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 4%;
  margin-bottom:0px;
  padding: 25px 25px 25px 25px;
  background-color: rgb(245, 255, 245);
}

#newsCard {
  width: 100%;
  background-color: #Ffffff;
  border: 0;
  margin-bottom: 35px;
  border-radius: 3px;
  padding: 20px 25px 20px 25px;
  box-shadow: 0 2px 6px 0.5px grey;
}

#tags {
  font-size: 13px;
  opacity: 0.8;
}

#newsTitle {
  margin-top: 10px;
  letter-spacing: 1px;
  font-weight: 650;
  font-size: 26px;
}

#newsDate {
  font-size: 13px;
  opacity: 0.8;
}

#newsContent {
  margin-top: 16px;
  text-align: justify;
}

</style>