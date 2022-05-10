<template>
  <div id="mainDiv">
    <div class="content">
      <div id="error" name="error"></div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div class="form-group">
              <label for="inputLogin">Twój nick</label>
              <input type="text" class="form-control" id="txtLogin" aria-describedby="emailHelp" placeholder="Podaj nick"  v-model="loginVal">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Adres email</label>
              <input type="email" class="form-control" id="txtEmail" aria-describedby="emailHelp" placeholder="Podaj email" v-model="email">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div class="form-group">
              <label for="exampleInputPassword1" minlength="8" required>Hasło</label>
              <input type="password" class="form-control" id="txtPassword" placeholder="Podaj hasło" v-model="passVal1">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword2" minlength="8" required>Powtórz hasło</label>
              <input type="password" class="form-control" id="txtPassword2" placeholder="Powtórz hasło" v-model="passVal2">   
            </div>
          </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div class="form-group">
                <button type="submit" class="btn btn-success" id="btnRegisterTest" @click="register">Zarejestruj się</button>     
              </div>          
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
    import { ref } from 'vue'
    const email = ref("")
    const passVal1 = ref("")  
    const passVal2 = ref("")
    const loginVal = ref("") 
    const auth = firebase.auth()
    
    const register = () => {
      auth.createUserWithEmailAndPassword(email.value, passVal1.value)
      auth.signInWithEmailAndPassword(email.value, pass.value)
      
      }
</script>
