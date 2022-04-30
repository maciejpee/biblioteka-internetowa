<template>
  <div id="mainDiv">
    <h1>{{ bookDetails.title }} - {{ bookDetails.author }}</h1>
    <img :src="bookDetails.cover" class="cover" />
    <p>{{ bookDetails.desc }}</p>
  </div>
</template>

<script>
export default {
  props: ["bookId"],
  data() {
    return {
      bookDetails: {},
    };
  },
  created() {
    db.collection("books").doc(this.bookId).get().then((doc) => {
        this.bookDetails["title"] = doc.data().title,
        this.bookDetails["author"] = doc.data().author;
        this.bookDetails["desc"] = doc.data().desc;
        this.bookDetails["cover"] = doc.data().cover;
      });
  },
};
</script>

<style>
    img.cover {
        width: 50px;
        height: 100px;
    }
</style>