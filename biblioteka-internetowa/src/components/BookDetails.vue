<template>
  <div id="mainDiv">
    <div class="row">
      <div class="col-4">
        <img :src="bookDetails.cover" class="cover" />
      </div>
      <div class="col-8">
        <h1>{{ bookDetails.title }}</h1>
        <h3>{{ bookDetails.author }}</h3><hr>
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
    </div><hr>
    <div v-if="series.length > 0">
      <h4>Inne książki z cyklu {{ bookDetails.series }}</h4>
      <div class="row">
        <div v-for="b of series" class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 py-2">
          <div class="card" role="link" @click="pageReload(b.id)">
            <img :src=b.cover class="card-img cover-small">
            <span>{{ b.title }}</span>
            <span>Tom {{ b.volume }}</span>
            <span>{{ b.author }}</span>
          </div>
        </div>
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
      series: [],
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
      /*
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
      */
      db.collection('books').where('series', '==', this.bookDetails.series).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          if (doc.data().title != this.bookDetails.title) {
            const data = {
            'id': doc.id,
            'title': doc.data().title,
            'author': doc.data().author,
            'cover': doc.data().cover,
            'volume': doc.data().volume,
            }
            this.series.push(data)
          }
        });
        this.series.sort(function(a,b){
          return a.volume - b.volume
        });
      });

    });
  },
  methods: {
    pageReload(id) {
      var index = window.location.href.indexOf('details') + 8
      var url = window.location.href.slice(0, index) + id
      window.location.replace(url)
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