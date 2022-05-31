<template>
  <div id="mainDiv">
    <div class="content">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div class="form-group">
              <label for="inputLogin">Twój nick</label>
              <input type="text" class="form-control" :class="loginWarning" id="txtLogin" aria-describedby="emailHelp" placeholder="Podaj nick"  v-model="login">
              <small v-show="loginAlertVisible" id="loginHelpBlock" class="form-text text-danger">
                Nick powinien mieć co najmniej 5 znaków.
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Adres email</label>
              <input type="email" class="form-control" :class="emailWarning" id="txtEmail" aria-describedby="emailHelp" placeholder="Podaj email" v-model="email">
              <small v-show="emailAlertVisible" id="emailHelpBlock" class="form-text text-danger">
                Niepoprawny adres email.
              </small>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div class="form-group">
              <label for="exampleInputPassword1" minlength="8" >Hasło</label>
              <input type="password" class="form-control" :class="password1Warning" id="txtPassword" placeholder="Podaj hasło" v-model="password1">
              <small v-show="passwordLengthlAlertVisible" id="passwordHelpBlock" class="form-text text-danger">
                Hasło powinno mieć co najmniej 6 znaków.
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword2" minlength="8" >Powtórz hasło</label>
              <input type="password" class="form-control" :class="password2Warning" id="txtPassword2" placeholder="Powtórz hasło" v-model="password2">
              <small v-show="passwordDifferencelAlertVisible" id="passwordHelpBlock" class="form-text text-danger">
                Hasła różnią się.
              </small>   
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
  const password1 = ref("")  
  const password2 = ref("")
  const login = ref("") 
  const auth = firebase.auth()

  const loginAlertVisible = ref(false)
  const emailAlertVisible = ref(false)
  const passwordLengthlAlertVisible = ref(false)
  const passwordDifferencelAlertVisible = ref(false)

  const loginWarning = ref('')
  const emailWarning = ref('')
  const password1Warning = ref('')
  const password2Warning = ref('')
   
  const register = () => {
    loginAlertVisible.value = false
    emailAlertVisible.value = false
    passwordLengthlAlertVisible.value = false
    passwordDifferencelAlertVisible.value = false

    loginWarning.value = ''
    emailWarning.value = ''
    password1Warning.value = ''
    password2Warning.value = ''

    if (login.value.length < 5 || login.value == ""){
      loginAlertVisible.value = true;
      loginWarning.value = 'border-danger'
    }

    else if ( !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) ){
      emailAlertVisible.value = true;
      emailWarning.value = 'border-danger'
    }
    
    else if (password1.value.length < 6 || password1.value == ""){
      passwordLengthlAlertVisible.value = true;
      password1Warning.value = 'border-danger'
    }
    
    else if (password1.value != password2.value){
      passwordDifferencelAlertVisible.value = true;
      password2Warning.value = 'border-danger'
    }else{
      auth.createUserWithEmailAndPassword(email.value, password1.value)
        .then(cred => { db.collection('users').doc(cred.user.uid).set({
          user_name: login.value,
          is_admin: false,
          borrowed: [],
          favourites: [],
          waiting: [],
          arrears: 0
        })
        .then(function onSuccess(res) {
          location.replace('/');
        })
        .catch(function onError(err) {
          console.error(err);
        })
        })
      }
  }
    
</script>
