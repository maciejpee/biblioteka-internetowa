<template>
  <div id="mainDiv">
    <h1>{{newsDetails.title}}</h1>
    <span>{{newsDetails.about}}, {{getRealDate(newsDetails.date.seconds)}}</span>
    <p>{{newsDetails.content}}</p>
    <div id="tags">tagi: {{tagsHandler(newsDetails.tags)}}</div>
  </div>
</template>

<script>
export default {
  props: ["newsId"],
  data() {
    return {
      newsDetails: {},
    };
  },
  created() {
    db.collection("news").doc(this.newsId).get().then((doc) => {
        this.newsDetails["title"] = doc.data().title,
        this.newsDetails["content"] = doc.data().content;
        this.newsDetails["date"] = doc.data().date;
        this.newsDetails["tags"] = doc.data().tags;
        this.newsDetails['about'] = doc.data().about;
      });
  },
  methods: {
    getRealDate(thing) {
      var realDate = new Date(thing * 1000)
      return realDate.getDate() + '/' + realDate.getMonth() + '/' + realDate.getFullYear()
    },
    tagsHandler(tagsList){
        return tagsList.join([', '])
    }
  }
};


</script>

<style>

</style>