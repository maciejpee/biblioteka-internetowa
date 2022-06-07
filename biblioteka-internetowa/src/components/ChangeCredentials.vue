<template>
    <div>
        <div class="row">
            <div class="col-md-11">
                <h4 class="profile-title">Dane logowania</h4>
            </div>
            <div class="col-md-1">
                <img src="/edit.png" width="28" height="28" type="button" class="icon" data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
            </div>
        </div>
        <text class="profile-info">Email: </text><text>{{oldEmail}}</text>

        <div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" @click.self="closeModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Zaktualizuj dane logowania</h5>
                        <img @click="refresh" type="button" class="icon btn-close" width="30" height="30" src="/reject.png" data-bs-dismiss="modal" aria-label="Close">
                    </div>
                    <div class="modal-body">
                        
                            <div class="container">
                                <form class="row g-3 justify-content-center" @submit.prevent="addBook">

                                    <div class="col-9 form-floating">
                                        <input type="password" class="form-control" :class="oldPasswordWarning" id="inputOldPassword" v-model="oldPassword" placeholder="password">
                                        <label for="inputOldPassword">Stare hasło</label>
                                        <small v-show="oldPasswordAlertVisible" id="oldPasswordHelpBlock" class="form-text text-danger">
                                        Niepoprawne hasło.
                                        </small>
                                    </div>

                                    <div class="col-9 form-floating">
                                        <input type="password" class="form-control" :class="passwordLengthWarning" id="inputNewPassword1" v-model="newPassword1" placeholder="password">
                                        <label for="inputNewPassword1">Nowe hasło</label>
                                        <small v-show="passwordLengthlAlertVisible" id="newPassword1HelpBlock" class="form-text text-danger">
                                        Hasło powinno mieć co najmniej 8 znaków.
                                        </small>
                                    </div>

                                    <div class="col-9 form-floating">
                                        <input type="password" class="form-control" :class="passwordDifferenceWarning" id="inputNewPassword2" v-model="newPassword2" placeholder="password">
                                        <label for="inputNewPassword2">Powtórz nowe hasło</label>
                                        <small v-show="passwordDifferencelAlertVisible" id="newPassword2HelpBlock" class="form-text text-danger">
                                        Hasła różnią się.
                                        </small>
                                    </div>                                   
                                </form>
                            </div>

                    </div>
                    <div class="modal-footer">
                        <button @click="changePassword" type="button" class="btn btn-success shadow-none">Zatwierdź</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'

    const oldEmail = ref("")
    const oldPassword = ref("")
    const newPassword1 = ref("")
    const newPassword2 = ref("")
    const auth = firebase.auth()

    const errors = ref(new Set([]))
    const props = defineProps(['userId'])

    const oldPasswordAlertVisible = ref(false)
    const passwordLengthlAlertVisible = ref(false)
    const passwordDifferencelAlertVisible = ref(false)

    const oldPasswordWarning = ref('')
    const passwordLengthWarning = ref('')
    const passwordDifferenceWarning = ref('')

    onMounted(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                oldEmail.value = user.email  
            }
        })
    })

    function changePassword () {
        oldPasswordAlertVisible.value = false
        passwordLengthlAlertVisible.value = false
        passwordDifferencelAlertVisible.value = false

        oldPasswordWarning.value = ''
        passwordLengthWarning.value = ''
        passwordDifferenceWarning.value = ''

        if (newPassword1.value.length < 6 && newPassword1.value.length > 0) {
            passwordLengthlAlertVisible.value = true;
            passwordLengthWarning.value = 'border-danger'
            errors.value.add('passwordLength')
        } else {
            errors.value.delete('passwordLength')
        }

        if (newPassword1.value != newPassword2.value) {
            passwordDifferencelAlertVisible.value = true;
            passwordDifferenceWarning.value = 'border-danger'
            errors.value.add('passwordDifference')
        } else {
            errors.value.delete('passwordDifference')
        }

        console.log("Numer of errors: ", errors.value.size)

        // login with email and old password and change to the new password

        if (errors.value.size == 0) {
            let isError = false;

            let passwordUpdated = false;
            if (newPassword1.value!="") {
                const user = firebase.auth().currentUser;

                let credentials = firebase.auth.EmailAuthProvider.credential(
                    oldEmail.value,
                    oldPassword.value
                );

                user.reauthenticateWithCredential(credentials)
                .then((userCredential) => {
                    firebase.auth().currentUser.updatePassword(newPassword1.value).then(() => {
                        passwordUpdated = true;
                        console.log('password updated');
                        location.reload()
                    }).catch((err) => {
                        console.error(err);
                        console.log('password not updated')
                        window.alert(err);
                    });
                })
                .catch((error) => {
                    isError = true;
                    console.log("Can't log in, bad username/credentials or problem with server");
                    console.error(error);
                    window.alert(error);
                })
            }
    
        }
    }

    function refresh() {
        oldPassword.value = ""
        newPassword1.value = ""
        newPassword2.value = ""
    }

    

</script>


<style scoped>
input {
  padding: 7px;
  border: 0.1;
  border-radius: 6px;
  margin-bottom: 10px;
}

.d-grid {
    margin-top: 30px;
    margin-bottom: 8px;
}

.modal-dialog {
  margin-top: 7%;
}
.profile-info {
    font-weight: bold;
    margin-top: 10px;
    margin-left: 20px;
}
</style>