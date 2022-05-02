<template>
  <div id="mainDiv">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <img :src="bookDetails.cover" class="cover" />
        </div>
        <div class="col-8">
          <h1 v-if="bookDetails.series && bookDetails.volume">
          {{ bookDetails.title }}. {{ bookDetails.series }}. Tom {{ bookDetails.volume }}
          </h1>
          <h1 v-else-if="bookDetails.series">
          {{ bookDetails.title }}. {{ bookDetails.series }}
          </h1>
          <h1 v-else-if="bookDetails.volume">
          {{ bookDetails.title }}. Tom {{ bookDetails.volume }}
          </h1>
          <h1 v-else>
          {{ bookDetails.title }}
          </h1>
          <h3>Autor: {{ bookDetails.author }}</h3><hr>
          <span>Opis</span>
          <p>{{ bookDetails.desc }}</p><hr>
          <div class="row">
            <div class="col-4">
              <ul style="list-style: none;">
                <li>Rok wydania: </li><hr>
                <li>Liczba stron: </li><hr>
                <li>Kategorie: </li><hr>
                <li>Wydawca: </li><hr>
                <li>Numer ISBN:</li><hr>
              </ul>
            </div>
            <div class="col-8">
              <ul style="list-style: none;">
                <li>{{ bookDetails.release_year }}</li><hr>
                <li>{{ bookDetails.page_count }}</li><hr>
                <li>{{ bookDetails.categories }}</li><hr>
                <li>{{ bookDetails.publishing }}</li><hr>
                <li>{{ bookDetails.isbn }}</li><hr>
              </ul>
            </div>
          </div>
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
        this.bookDetails["categories"] = doc.data().categories;
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