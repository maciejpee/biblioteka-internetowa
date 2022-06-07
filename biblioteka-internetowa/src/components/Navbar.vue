<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container-fluid">

        <router-link class="navbar-brand" to="/">
          <img class="main-logo" src="/book2.png" width="28" height="30" >
          <text class="logo">Bookworm</text>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/news">Aktualności <span class="sr-only">(current)</span></router-link>
            </li>

            <li class="nav-item dropdown" v-if="loggedIn">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{userName}}</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              
                <li><router-link class="dropdown-item" :to="{name:'Profile', params:{userId: id}}">Twój profil</router-link></li>
                
                <li class="nav-item" v-if="admin">
                  <router-link class="dropdown-item" :to="{name:'AddBook'}">Dodaj książkę</router-link>
                </li>

                <li class="nav-item" v-if="admin">
                  <router-link class="dropdown-item" :to="{name:'AddPost'}">Dodaj post</router-link>
                </li>

                <li><hr class="dropdown-divider"></li>

                <li><a class="dropdown-item" href="#" @click="logout">Wyloguj się</a></li>
              </ul>
            </li>

            <li class="nav-item dropdown" v-if="!loggedIn">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Konto</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">

                <li class="nav-item">
                  <a class="dropdown-item" href="#" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">Załóż konto</a>
                </li>

                <li class="nav-item">
                  <a class="dropdown-item" href="#" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Zaloguj się</a>
                </li>

              </ul>
            </li>
          </ul>
        </div>
        <form class="d-flex" @submit.prevent="handleSearchBar">
          <input v-model="searchv" class="form-control search" placeholder="Wyszukaj..." :class="searchWarning" >
          <div class="nav-link" @click="handleSearchBar"  ><img class="icon" src="/magnifier.png" width="30" height="30" style="cursor: pointer;"></div>
        </form>
      

      </div>
    </nav>
    <RegisterModal/>
    <LoginModal/>
  </div>
</template>

<script setup>
  import { ref, onMounted, reactive, computed } from 'vue'
  import LoginModal from "./LoginModal.vue"
  import RegisterModal from "./RegisterModal.vue"

  const userName = ref('')
  const id = ref('')
  const loggedIn = ref(false)
  const admin = ref(false)
  
  const searchv = ref('')
  const searchWarning = ref('')
  
  onMounted(() => {
    firebase.auth().onAuthStateChanged(user => {
       if (user) {
         id.value = user.uid
         db.collection("users").doc(user.uid).get().then((doc) => {
           userName.value = doc.data().user_name
           admin.value = doc.data().is_admin
           loggedIn.value = true
         })
         
       }
    })
  })

  function logout() {
    firebase.auth().signOut().then(() => {
      location.replace('/')
    })
  }

  function handleSearchBar(){
    if (!searchv.value){
      searchWarning.value = 'border-danger'
    }else{
      window.location.replace('/search/' + searchv.value.replace(/ +/g, '_'))
      //tutaj zamienia te spacje na myslink zeby zbydowac adres jak usuniesz to tak też powinno działać
      // mniejsza jak usuniesz tutaj to ten myslnik cnie, to zmieni sie tez prop bo on go z pobiera stad
      // dlatego mozemy uzyc znaku ktory nie wystapi w tytule i potem go po prostu odmienic 
      // robimy test
      // tak to od ans XDD
      // chuj go wie aaa wiem moze jest jak to sie mowi ze zaklepany dla czegos wlasnie
      //to dawaj ten % bo z propami jest domyślnie chyba chociaż u Ciebie niby nie XD
      // ale coto za blad to od nas?
      //możliwe dlatego tam jest automatycznie ale to troche szkoda w sumie xd 
      //ci
    // podloga dziala, bezie w tytule? nie powinna być
    }
  }

</script>

<style>
text.logo {
  font-size: 24px;
  letter-spacing: 2px;
  font-family: Tahoma, Verdana, sans-serif;
  margin-left: 12px;
}

img.main-logo {
  margin-bottom: 5px;
}

.icon:hover{
    transform: scale(1.1);
    cursor: pointer;
}

.search:focus {
  border: 1px solid rgba(60, 149, 25, 0.659);
  border-radius: 3px;
  outline: 1px ridge rgba(96, 236, 41, 0.573);
  -webkit-box-shadow: none;
  box-shadow: none;
}


/* .navbar {
  background-color: #0f7c05;
} */
.navbar .navbar-brand, .navbar .navbar-brand:focus {
  color: #0f7c05;
}
.navbar .navbar-brand:hover {
  color: #7bbe5c;
}
.navbar .navbar-nav .nav-link {
  color: #0f7c05;
}
.navbar .navbar-nav .nav-link:not(.disabled):hover {
  color: #7bbe5c;
}
.navbar .navbar-nav .nav-link:not(.disabled):focus {
  color: #0f7c05;
}
.navbar .navbar-nav .dropdown-menu {
  border-color: #b1c9a6;
}
.navbar .navbar-nav .dropdown-menu .dropdown-divider {
  border-top-color: #579c50;
}
.navbar .navbar-nav .dropdown-menu .dropdown-item:hover {
  color: #ffffff;
  background-color: #89c283;
}
.navbar .navbar-nav .dropdown-menu .dropdown-item:focus {
  color: #ffffff;
  background-color: #0f7c05;
}
nav {
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.13);
}

/* .navbar {
  background-color: #0f7c05;
}
.navbar .navbar-brand {
  color: #ffffff;
}
.navbar .navbar-nav .nav-link {
  color: #ffffff;
}
.navbar .navbar-nav .nav-link:not(.disabled):hover {
  color: #b1c9a6;
}
.navbar .navbar-nav .dropdown-menu {
  border-color: #b1c9a6;
}
.navbar .navbar-nav .dropdown-menu .dropdown-divider {
  border-top-color: #579c50;
}
.navbar .navbar-nav .dropdown-menu .dropdown-item:hover {
  color: #ffffff;
  background-color: #89c283;
}
.navbar .navbar-nav .dropdown-menu .dropdown-item:focus {
  color: #ffffff;
  background-color: #0f7c05;
}
nav {
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
} */

/* <nav class="navbar navbar-expand-md navbar-light bg-light"> */
</style>