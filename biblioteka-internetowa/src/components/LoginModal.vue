<template>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" @click.self="closeModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Logowanie</h5>
                    <img @click="refresh" type="button" class="icon btn-close" width="30" height="30" src="/reject.png" data-bs-dismiss="modal" aria-label="Close">
                </div>
                <div class="modal-body">
                    
                        <div class="container">
                            <form class="row g-3 justify-content-center" @submit.prevent="addBook">

                                <div class="col-9 form-floating">
                                    <input :class="emailWarning" type="email" class="form-control input-modal green" id="loginEmail" aria-describedby="emailHelp" v-model="email" placeholder="name@example.com">
                                    <label for="loginEmail">Adres email</label>
                                    <small v-show="wrongEmailAlertVisible" id="emailHelpBlock" class="form-text text-danger">
                                        Błędny adres email.
                                    </small>
                                    <small :class="emailWarning" v-show="userNotFoundAlertVisible" id="userHelpBlock" class="form-text text-danger">
                                        Użytkownik o danym adresie email nie istnieje.
                                    </small>
                                </div>

                                <div class="col-9 form-floating">
                                    <input :class="passwordWarning"  type="password" class="form-control input-modal green" id="txtPassword" v-model="pass" placeholder="password">
                                    <label for="txtPassword" required>Hasło</label>
                                    <small v-show="wrongPasswordAlertVisible" id="passwordHelpBlock" class="form-text text-danger">
                                        Hasło jest nieprawidłowe.
                                    </small>
                                </div>
                              
                            </form>
                        </div>

                </div>
                <div class="modal-footer">
                    <button @click="login" type="button" class="btn btn-success shadow-none">Zaloguj się</button>
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
.modal-dialog {
  margin-top: 10%;
  border-radius: 25px;

}
.container {
  margin: 30px 0px 20px 0px;
}

.modal-content {
  border-radius: 10px;
}


</style>