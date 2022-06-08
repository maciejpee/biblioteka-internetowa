<template>
  <div class="mainDiv">
    <div class="row">
      <div class="col-4">
        <img :src="bookDetails.cover" class="cover" />
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col-11">
            <h2 >{{ bookDetails.title }}</h2>
          </div>
          <div class="col-1">
            <img class="icon" v-if="fav" src="/heartfull.png" width="50" height="50" style="cursor: pointer;" @click="addToFavourites"/>
            <img class="icon" v-if="!fav" src="/heart.png" width="50" height="50" style="cursor: pointer;" @click="addToFavourites"/>
          </div>
        </div>
        <h5 class="green-link" ><router-link :to="{ name : 'Search', params:{sv: bookDetails.author}}">{{ bookDetails.author }}</router-link></h5>
        <table class="table">
          <tbody>
            <tr v-if="bookDetails.original_title">
              <td><text class="details-b">Tytuł oryginału: </text></td>
              <td>{{ bookDetails.original_title }}</td>
            </tr>
            <tr v-if="bookDetails.series">
              <td><text class="details-b">Cykl: </text></td>
              <td>{{ bookDetails.series }} (tom {{ bookDetails.volume }})</td>
            </tr>
            <tr v-if="bookDetails.release_year">
              <td><text class="details-b">Rok wydania: </text></td>
              <td>{{ bookDetails.release_year }}</td>
            </tr>
            <tr v-if="bookDetails.page_count">
              <td><text class="details-b">Liczba stron: </text></td>
              <td>{{ bookDetails.page_count }}</td>
            </tr>
            <tr v-if="bookDetails.publishing">
              <td><text class="details-b">Wydawca: </text></td>
              <td>{{ bookDetails.publishing }}</td>
            </tr>
            <tr v-if="bookDetails.isbn">
              <td><text class="details-b">ISBN: </text></td>
              <td>{{ bookDetails.isbn }}</td>
            </tr>
            <tr v-if="bookDetails.translation">
              <td><text class="details-b">Przekład: </text></td>
              <td>{{ bookDetails.translation }}</td>
            </tr>
          </tbody>
        </table>
        <div class="rows">
            <div class="tag" v-for="genre of bookDetails.genre" :key="genre.id">
              <button class="tag"><router-link :to="{ name : 'Search', params:{sv: genre}}">{{genre}}</router-link></button>
          </div>
        </div>
      </div>
      
      
    </div>
    <p class="desc-details">{{ bookDetails.desc }}</p>
    <hr class="hr-marg">
    <CopiesV2 v-if="firestore" :copies="bookDetails.copies" :bookId="props.bookId"/>
    <hr class="hr-marg">
    <SeriesRecommend v-if="firestore" :bookSeries="bookDetails.series" :currentBook="bookDetails.title"/>
    
    <GenreRecommend v-if="firestore" :bookSeries="bookDetails.series"  :genre="bookDetails.genre[0]" :id="props.bookId"/>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import SeriesRecommend from "./SeriesRecommend.vue"
  import GenreRecommend from "./GenreRecommend.vue"
  import CopiesV2 from "./CopiesV2.vue"
  const props = defineProps(["bookId"])

  const bookDetails = ref({})
  const firestore = ref(false)
  const fav = ref(false)

  onMounted(() => {
    db.collection("books").doc(props.bookId).get().then((doc) => {
      bookDetails.value["author"] = doc.data().author
      bookDetails.value["title"] = doc.data().title
      bookDetails.value["desc"] = doc.data().desc
      bookDetails.value["series"] = doc.data().series
      bookDetails.value["volume"] = doc.data().volume
      bookDetails.value["page_count"] = doc.data().page_count
      bookDetails.value["isbn"] = doc.data().isbn
      bookDetails.value["release_year"] = doc.data().release_year
      bookDetails.value["publishing"] = doc.data().publishing
      bookDetails.value["genre"] = doc.data().genre
      bookDetails.value["cover"] = doc.data().cover
      bookDetails.value["original_title"] = doc.data().original_title
      bookDetails.value["translation"] = doc.data().translation
      bookDetails.value["copies"] = []

      var copies = doc.data().copies
      for(let i = 0; i < copies.length; i++){
        if (copies[i]) {
          var realDate = new Date(copies[i].seconds * 1000)
        } else {
          var realDate = null
        }
        bookDetails.value["copies"].push({
          date: realDate,
          index: i
        })
      }
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          db.collection('users').doc(user.uid).get().then((doc) => {
            if (doc.data().favourites.includes(props.bookId)) {
              fav.value = true
            }
          })
        }
      })

      firestore.value = true 
    })
  })

  function addToFavourites() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        db.collection('users').doc(user.uid).get().then((doc) => {
          var favs = doc.data().favourites
          console.log(favs.includes(props.bookId))
          if (!favs.includes(props.bookId)) {
            fav.value = true
            favs.push(props.bookId)
            db.collection('users').doc(user.uid).update({
              favourites: favs
            })
          } else {
            fav.value = false
            db.collection('users').doc(user.uid).update({
              favourites: firebase.firestore.FieldValue.arrayRemove(props.bookId)
            })
          }
        })
      } else {
        console.log('not logged in');
        }
    })
  }    
    
</script>

<style>
  img.cover {
    width: 90%;
    height: auto;
  }
  .tags{
    margin-left: 35%   
  }
  .tag button{
    float:left;
    margin-left: 20px;
    margin-top: 12px;
    border-radius: 6px;
    background: #257c1dd5;
    padding: 2px 8px 4px 8px;
    border-color: #1c9411d5;
  }
  .tag a{
    text-decoration: none;
    color: #ffffff;
  }

  .green-link a{
    text-decoration: none;
    cursor: pointer;
    color:#464646;
  }
text.details-b {
  font-weight: bold;
}
h2 {
  font-size: 34px;
  margin-left:20px;
  color: #257c1dd5;
}
h4, h5 {
  margin-bottom: 50px;
  margin-left:20px;
}
p.desc-details {
  padding: 30px 0px 30px 0px;
  margin-top: 35px;
}
table.table {
  border-collapse: collapse;
  border-bottom: #7f7f7f2e;
  width: 85%;
  margin-left:20px;
  margin-top: 50px;
}

</style>