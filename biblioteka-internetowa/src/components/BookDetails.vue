<template>
  <div id="mainDiv">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <img :src="bookDetails.cover" class="cover" />
        </div>
        <div class="col-8">
          <h1 v-if="bookDetails.volume">
          {{ bookDetails.title }}. Tom {{ bookDetails.volume }}
          </h1>
          <h1 v-else>
          {{ bookDetails.title }}
          </h1>
          <h3>{{ bookDetails.author }}</h3><hr>
          <span>Opis</span>
          <p>{{ bookDetails.desc }}</p><hr>
          <table>
            <tr v-if="bookDetails.original_title">
              <th>Tytuł oryginału: </th>
              <th>{{ bookDetails.original_title }}</th>
            </tr>
            <tr v-if="bookDetails.series">
              <th>Cykl: </th>
              <th>{{ bookDetails.series }} (tom {{ bookDetails.volume }})</th>
            </tr>
            <tr v-if="bookDetails.release_year">
              <th>Rok wydania: </th>
              <th>{{ bookDetails.release_year }}</th>
            </tr>
            <tr v-if="bookDetails.page_count">
              <th>Liczba stron: </th>
              <th>{{ bookDetails.page_count }}</th>
            </tr>
            <tr v-if="bookDetails.publishing">
              <th>Wydawca: </th>
              <th>{{ bookDetails.publishing }}</th>
            </tr>
            <tr v-if="bookDetails.release_year">
              <th>Rok wydania: </th>
              <th>{{ bookDetails.release_year }}</th>
            </tr>
            <tr v-if="bookDetails.isbn">
              <th>ISBN: </th>
              <th>{{ bookDetails.isbn }}</th>
            </tr>
            <tr v-if="bookDetails.translation">
              <th>Przekład: </th>
              <th>{{ bookDetails.translation }}</th>
            </tr>
          </table>
        </div> 
      </div>
      <p>Dostępne egzemplarze:</p>
      <div v-for="copy of bookDetails.copies">
        <span v-if="copy">{{ copy }}</span>
        <span v-if="!copy">Dostępny</span>
      </div>
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
        this.bookDetails["series"] = doc.data().series;
        this.bookDetails["volume"] = doc.data().volume;
        this.bookDetails["page_count"] = doc.data().page_count;
        this.bookDetails["isbn"] = doc.data().isbn;
        this.bookDetails["release_year"] = doc.data().release_year;
        this.bookDetails["publishing"] = doc.data().publishing;
        this.bookDetails["genre"] = doc.data().genre;
        this.bookDetails["cover"] = doc.data().cover;
        this.bookDetails["original_title"] = doc.data().original_title;
        this.bookDetails["translation"] = doc.data().translation;
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
  methods: {
    categoriesHandler(categoriesList){
      

    }

  }
};
</script>

<style>
  img.cover {
    width: 100%;
    height: auto;
  }
</style>