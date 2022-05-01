<template>
  <div id="mainDiv">
    <h1>{{ bookDetails.title }} - {{ bookDetails.author }}</h1>
    <img :src="bookDetails.cover" class="cover" />
    <p>{{ bookDetails.desc }}</p>
    <p>Dostępne egzemplarze:</p>
    <div v-for="copy of bookDetails.copies">
      <span v-if="copy">{{ copy }}</span>
      <span v-if="!copy">Dostępny</span>
    </div>
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
        this.bookDetails["copies"] = []
        var copies = doc.data().copies
        for(let i = 0; i < copies.length; i++){ 
          if (copies[i]) {
            var realDate = new Date(copies[i].seconds * 1000)
            var date = realDate.getDate() + '/' + (realDate.getMonth() + 1) + '/' + realDate.getFullYear()
            this.bookDetails["copies"].push(date)
          } else {
            this.bookDetails["copies"].push(null)
          }
        }
        this.bookDetails["copies"].sort()
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