<template>
  <div class="mainDiv">
    <div class="container">
      <div class="row">

        <div class="col-xl-3 col-lg-3"></div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <label class="form-label" for="exampleInputEmail1">Adres email</label>
            <input :class="emailWarning" type="email" class="form-control" id="txtEmail" aria-describedby="emailHelp" placeholder="Podaj email" v-model="email">
            <small v-show="wrongEmailAlertVisible" id="emailHelpBlock" class="form-text text-danger">
                Błędny adres email.
            </small>
            <small :class="emailWarning" v-show="userNotFoundAlertVisible" id="userHelpBlock" class="form-text text-danger">
                Użytkownik o danym adresie email nie istnieje.
            </small>
          </div>
        </div>
        <div class="col-xl-3 col-lg-3"></div>

        <div class="col-xl-3 col-lg-3"></div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group">
            <label class="form-label" for="exampleInputPassword1" minlength="8" required>Hasło</label>
            <input :class="passwordWarning"  type="password" class="form-control" id="txtPassword" placeholder="Podaj hasło" v-model="pass">
            <small v-show="wrongPasswordAlertVisible" id="passwordHelpBlock" class="form-text text-danger">
                Hasło jest nieprawidłowe.
            </small>
          </div>
        </div>
        <div class="col-xl-3 col-lg-3"></div>

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="form-group text-center">
            <button type="submit" class="btn btn-primary d-grid" id="btnLogIn" @click="login()" style="width:250px">Zaloguj się</button>
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

  const wrongEmailAlertVisible = ref(false)
  const wrongPasswordAlertVisible = ref(false)
  const userNotFoundAlertVisible = ref(false)

  const emailWarning = ref('')
  const passwordWarning = ref('')

  function  login() {
    auth.signInWithEmailAndPassword(email.value, pass.value)
    .catch(function(error) {
      wrongEmailAlertVisible.value = false
      wrongPasswordAlertVisible.value = false
      userNotFoundAlertVisible.value = false

      emailWarning.value = ''
      passwordWarning.value = ''

      if (error.code == 'auth/invalid-email') {
        wrongEmailAlertVisible.value = true
        emailWarning.value = 'border-danger'
      }
      if (error.code == 'auth/wrong-password') {
        wrongPasswordAlertVisible.value = true
        passwordWarning.value = 'border-danger'
      }
      if (error.code == 'auth/user-not-found') {
        userNotFoundAlertVisible.value = true
        emailWarning.value = 'border-danger'
      }
    })
    
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