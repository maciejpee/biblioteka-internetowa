<template>
    <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" @click.self="closeModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Rejestracja</h5>
                    <img @click="refresh" type="button" class="icon btn-close" width="30" height="30" src="/reject.png" data-bs-dismiss="modal" aria-label="Close">
                </div>
                <div class="modal-body">
                    
                        <div class="container">
                            <form class="row g-3 justify-content-center">

                                <div class="col-9 form-floating">
                                    <input type="text" class="form-control green" :class="loginWarning" id="txtLogin" aria-describedby="emailHelp" placeholder="Podaj nick"  v-model="login">
                                    <label for="inputLogin">Twój nick</label>
                                    <small v-show="loginAlertVisible" id="loginHelpBlock" class="form-text text-danger">
                                        Nick powinien mieć co najmniej 5 znaków.
                                    </small>
                                </div>

                                <div class="col-9 form-floating">
                                    <input type="email" class="form-control green" :class="emailWarning" id="txtEmail" aria-describedby="emailHelp" placeholder="Podaj email" v-model="email">
                                    <label for="exampleInputEmail1">Adres email</label>
                                    <small v-show="emailAlertVisible" id="emailHelpBlock" class="form-text text-danger">
                                        Niepoprawny adres email.
                                    </small>
                                </div>

                                <div class="col-9 form-floating">
                                    <input type="password" class="form-control green" :class="password1Warning" id="txtPassword" placeholder="Podaj hasło" v-model="password1">
                                    <label for="exampleInputPassword1" minlength="8" >Hasło</label>
                                    <small v-show="passwordLengthlAlertVisible" id="passwordHelpBlock" class="form-text text-danger">
                                        Hasło powinno mieć co najmniej 6 znaków.
                                    </small>
                                </div>

                                <div class="col-9 form-floating">
                                    <input type="password" class="form-control green" :class="password2Warning" id="txtPassword2" placeholder="Powtórz hasło" v-model="password2">
                                    <label for="exampleInputPassword2" minlength="8" >Powtórz hasło</label>
                                    <small v-show="passwordDifferencelAlertVisible" id="passwordHelpBlock" class="form-text text-danger">
                                        Hasła różnią się.
                                    </small>  
                                </div>
                              
                            </form>
                        </div>

                </div>
                <div class="modal-footer">
                    <button @click="register" type="button" class="btn btn-success shadow-none">Zarejestruj się</button>
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
   
  function register() {
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

<style scoped>
.modal-dialog {
  margin-top: 5%;
}
.container {
  margin: 25px 0px 15px 0px;
}

.modal-content {
  border-radius: 10px;
}

</style>