<template>
    <div v-if="series.length > 0">
      <h4>Inne książki z cyklu {{ bookSeries }}</h4>
      <div class="row justify-content-center">
        <div v-for="b of series" class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 py-2">
          <div class="card h-100" @click="pageReload(b.id)">
            <img :src=b.cover class="card-img cover-small">
            <span>{{ b.title }}</span>
            <span>Tom {{ b.volume }}</span>
            <span>{{ b.author }}</span>
          </div>
        </div>
      </div><hr>
    </div>
</template>

<script>
export default {
  props: ["bookSeries", "currentBook"],
  data() {
    return {
      series: [],
    };
  },
  created() {
    db.collection('books').where('series', '==', this.bookSeries).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      if (doc.data().title != this.currentBook) {
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