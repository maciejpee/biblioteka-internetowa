<template>
  <div id="mainDiv">
    <h1>{{ bookDetails.title }} - {{ bookDetails.author }}</h1>
    <img :src="bookDetails.cover" class="cover" />
    <p>{{ bookDetails.desc }}</p>
    <p>{{ bookDetails.copies }}</p>
  </div>
</template>

<script>
  db.collection("books").doc("JJUY8MBvddfmAuITxVNC").collection('copies').get().then((copy) => {
    console.log(copy.data())
  })
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
        this.bookDetails["copies"] = doc.data().copies;
      });
  },
};

</script>


<style>
  img.cover {
    width: 50%;
    height: auto;
  }
</style>