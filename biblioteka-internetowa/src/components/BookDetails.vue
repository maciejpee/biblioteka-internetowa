<template>
  <div id="mainDiv">
    <div class="row">
      <div class="col-4">
        <img :src="bookDetails.cover" class="cover" />
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col-10">
            <h1>{{ bookDetails.title }}</h1>
          </div>
          <div class="col-2">
            <img v-if="fav" src="/heartfull.png" width="50" height="50" style="cursor: pointer;" @click="addToFavourites"/>
            <img v-if="!fav" src="/heart.png" width="50" height="50" style="cursor: pointer;" @click="addToFavourites"/>
          </div>
        </div>
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
          <tr v-if="bookDetails.isbn">
            <th>ISBN: </th>
            <th>{{ bookDetails.isbn }}</th>
          </tr>
          <tr v-if="canNuke"><button @click="nukeBook">NUKE BOOK</button></tr>
          <tr v-if="bookDetails.translation">
            <th>Przekład: </th>
            <th>{{ bookDetails.translation }}</th>
          </tr>
        </table>
      </div>
    </div><hr>
    <CopiesV2 v-if="firestore" :copies="bookDetails.copies" :bookId="props.bookId"/>
    <hr>
    <SeriesRecommend v-if="firestore" :bookSeries="bookDetails.series" :currentBook="bookDetails.title"/>
    
    <GenreRecommend v-if="firestore" :bookSeries="bookDetails.series"  :genre="bookDetails.genre[0]" :id="props.bookId"/>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import SeriesRecommend from "./SeriesRecommend.vue"
  import GenreRecommend from "./GenreRecommend.vue"
  import Copies from "./Copies.vue"
  import CopiesV2 from "./CopiesV2.vue"
  const canNuke = ref(false)
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
      if (!doc.data().queue){
        canNuke.value = true
      }
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
    function nukeBook(){
        db.collection("books").doc(props.bookId).get().then((doc) => {
            if (!doc.data().queue){
              db.collection("books").doc(props.bookId).update({
                queue: []
              })
            }
        })

           
    }
    
    
</script>

<style>
  img.cover {
    width: 100%;
    height: auto;
  }
</style>