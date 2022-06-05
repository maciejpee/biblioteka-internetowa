<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container-fluid">

      <router-link class="navbar-brand" to="/">
        <img src="/book.png" width="28" height="30" >
        Bookworm
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
                <router-link class="dropdown-item" to="/register">Załóż konto</router-link>
              </li>

              <li class="nav-item">
                <router-link class="dropdown-item" to="/login">Zaloguj się</router-link>
              </li>

            </ul>
          </li>
        </ul>
      </div>
      <form class="d-flex" @submit.prevent="handleSearchBar">
        <input v-model="searchv" class="form-control" placeholder="Wyszukaj..." :class="searchWarning" >
        <div class="nav-link" @click="handleSearchBar"  ><img class="icon" src="/magnifier.png" width="30" height="30" style="cursor: pointer;"></div>
      </form>
    

    </div>
  </nav>
 


</template>

<script setup>
  import { ref, onMounted, reactive, computed } from 'vue'

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
      window.location.replace(window.location.protocol + '/search/' + searchv.value)
    }
  }

</script>

<style>
.icon:hover{
    transform: scale(1.1);
    cursor: pointer;
}
</style>