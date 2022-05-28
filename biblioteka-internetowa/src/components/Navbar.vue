<template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Readbook</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">

        <li class="nav-item">
          <router-link class="nav-link" to="/news">Aktualności <span class="sr-only">(current)</span></router-link>
        </li>
        
        <li class="nav-item" v-if="!loggedIn">
          <router-link class="nav-link" to="/register">Zarejestruj się</router-link>
        </li>

        <li class="nav-item" v-if="!loggedIn">
          <router-link class="nav-link" to="/login">Zaloguj się</router-link>
        </li>

          <li class="nav-item" v-if="false">
            <router-link class="nav-link" to="/search">Przeszukaj katalog</router-link>
        </li>

        <li class="nav-item" v-if="admin">
          <router-link class="nav-link" :to="{name:'AddBook'}">Dodaj książkę</router-link>
        </li>

        <li class="nav-item" v-if="admin">
          <router-link class="nav-link" :to="{name:'AddPost'}">Dodaj post</router-link>
        </li>

        <li class="nav-item dropdown" v-if="loggedIn">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{userName}}</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link class="dropdown-item" :to="{name:'Profile', params:{userId: id}}">Twój profil</router-link></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Wyloguj się</a></li>
          </ul>
        </li>

      </ul>
    </div>
  </nav>

</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const userName = ref('')
  const id = ref('')
  const loggedIn = ref(false)
  const admin = ref(false)

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
</script>