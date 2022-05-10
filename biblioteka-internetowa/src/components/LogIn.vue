<template>
  <div id="mainDiv">
    <div class="content">
      <div class="row">

        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Adres email</label>
            <input type="email" class="form-control" id="txtEmail" aria-describedby="emailHelp" placeholder="Podaj email" v-model="email">
          </div>
        </div>

        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <label for="exampleInputPassword1" minlength="8" required>Hasło</label>
              <input type="password" class="form-control" id="txtPassword" placeholder="Podaj hasło" v-model="pass">
          </div>
        </div>

        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <button type="submit" class="btn btn-success" id="btnLogIn" @click="login">Zaloguj się</button>
          </div>          
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const email = ref("")
  const pass = ref("")  
  const auth = firebase.auth()

  const login = () => {
    auth.signInWithEmailAndPassword(email.value, pass.value)
    

    auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        console.log('is logged in:', firebaseUser.email);
        location.replace('/')
      } else {
        console.log('not logged in');
        }
    })
  }
</script>

<style>
</style>