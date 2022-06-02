<template>
  <div id="mainDiv">
    <div class="container">
      <div class="row">

        <div class="col-xl-3 col-lg-3"></div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <label class="form-label" for="exampleInputEmail1">Adres email</label>
            <input type="email" class="form-control" id="txtEmail" aria-describedby="emailHelp" placeholder="Podaj email" v-model="email">
          </div>
        </div>
        <div class="col-xl-3 col-lg-3"></div>

        <div class="col-xl-3 col-lg-3"></div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <label class="form-label" for="exampleInputPassword1" minlength="8" required>Hasło</label>
              <input type="password" class="form-control" id="txtPassword" placeholder="Podaj hasło" v-model="pass">
          </div>
        </div>
        <div class="col-xl-3 col-lg-3"></div>

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group text-center">
            <button type="submit" class="btn btn-primary d-grid" id="btnLogIn" @click="login" style="width:250px">Zaloguj się</button>
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

<style scoped>
input {
  padding: 7px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0,0,0,0.03);
  border-radius: 6px;
  margin-bottom: 10px;
}

.form-label {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: -5px;
}

.d-grid {
    margin-top: 30px;
    margin-bottom: 8px;
}

</style>