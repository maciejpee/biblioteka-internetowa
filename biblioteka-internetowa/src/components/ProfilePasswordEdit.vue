<template>
    <div class="mainDiv">
        <div class="container">
            <form class="row g-3 justify-content-md-center" @submit.prevent="addBook">

                <div class="col-xl-3 col-lg-3"></div>
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <label for="inputEmail" class="form-label">Stary email</label>
                    <input type="email" class="form-control" id="inputEmail" v-model="email" :class="emailWarning">
                    <small v-show="emailAlertVisible" id="emailHelpBlock" class="form-text text-danger">
                    Niepoprawny email.
                    </small>
                </div>
                <div class="col-xl-3 col-lg-3"></div>

                <div class="col-xl-3 col-lg-3"></div>
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <label for="inputOldPassword" class="form-label">Stare hasło</label>
                    <input type="password" class="form-control" :class="oldPasswordWarning" id="inputOldPassword" v-model="oldPassword">
                    <small v-show="oldPasswordAlertVisible" id="oldPasswordHelpBlock" class="form-text text-danger">
                    Niepoprawne hasło.
                    </small>
                </div>
                <div class="col-xl-3 col-lg-3"></div>

                <div class="col-xl-3 col-lg-3"></div>
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <label for="inputNewEmail" class="form-label">Nowy email</label>
                    <input type="newEmail" class="form-control" id="inputNewEmail" v-model="newEmail" :class="newEmailWarning">
                    <small v-show="newEmailAlertVisible" id="newEmailHelpBlock" class="form-text text-danger">
                    Niepoprawny email.
                    </small>
                </div>
                <div class="col-xl-3 col-lg-3"></div>

                <div class="col-xl-3 col-lg-3"></div>
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <label for="inputNewPassword1" class="form-label">Nowe hasło</label>
                    <input type="password" class="form-control" :class="passwordLengthWarning" id="inputNewPassword1" v-model="newPassword1">
                    <small v-show="passwordLengthlAlertVisible" id="newPassword1HelpBlock" class="form-text text-danger">
                    Hasło powinno mieć co najmniej 8 znaków.
                    </small>
                </div>
                <div class="col-xl-3 col-lg-3"></div>

                <div class="col-xl-3 col-lg-3"></div>
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <label for="inputNewPassword2" class="form-label">Powtórz nowe hasło</label>
                    <input type="password" class="form-control" :class="passwordDifferenceWarning" id="inputNewPassword2" v-model="newPassword2">
                    <small v-show="passwordDifferencelAlertVisible" id="newPassword2HelpBlock" class="form-text text-danger">
                    Hasła różnią się.
                    </small>
                </div>
                <div class="col-xl-3 col-lg-3"></div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group text-center">
                        <button type="submit" class="btn btn-success shadow-none d-grid" id="btnChangePassword" style="width:250px" @click="changePasswordAndEmail">Potwierdź</button>     
                    </div>          
                </div>
                
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const email = ref("")
    const newEmail = ref("")
    const oldPassword = ref("")
    const newPassword1 = ref("")
    const newPassword2 = ref("")
    const auth = firebase.auth()

    const errors = ref(new Set([]))
    const props = defineProps(['userId'])

    const emailAlertVisible = ref(false)
    const newEmailAlertVisible = ref(false)
    const oldPasswordAlertVisible = ref(false)
    const passwordLengthlAlertVisible = ref(false)
    const passwordDifferencelAlertVisible = ref(false)

    const emailWarning = ref('')
    const newEmailWarning = ref('')
    const oldPasswordWarning = ref('')
    const passwordLengthWarning = ref('')
    const passwordDifferenceWarning = ref('')

    function changePasswordAndEmail () {
        emailAlertVisible.value = false
        newEmailAlertVisible.value = false
        oldPasswordAlertVisible.value = false
        passwordLengthlAlertVisible.value = false
        passwordDifferencelAlertVisible.value = false

        emailWarning.value = ''
        newEmailWarning.value = ''
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

        if ( !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.value)) && newEmail.value!="") {
            newEmailAlertVisible.value = true;
            newEmailWarning.value = 'border-danger'
            errors.value.add('newEmail')
        } else {
            errors.value.delete('newEmail')
        }

        console.log("Numer of errors: ", errors.value.size)

        // login with email and old password and change to the new password

        if (errors.value.size == 0) {
            console.log(email.value)
            console.log(oldPassword.value)
            let isError = false;

            let passwordUpdated = false;
            if (newPassword1.value!="") {
                const user = firebase.auth().currentUser;

                let credentials = firebase.auth.EmailAuthProvider.credential(
                    email.value,
                    oldPassword.value
                );

                user.reauthenticateWithCredential(credentials)

                .then((userCredential) => {
                    firebase.auth().currentUser.updatePassword(newPassword1.value).then(() => {
                        passwordUpdated = true;
                        console.log('password updated');
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

            if (newEmail.value!="") {

                const user = firebase.auth().currentUser;
                let credentials = firebase.auth.EmailAuthProvider.credential(
                    email.value,
                    passwordUpdated ? newPassword1.value : oldPassword.value
                );

                user.reauthenticateWithCredential(credentials)
                .then((userCredential) => {
                    firebase.auth().currentUser.updateEmail(newEmail.value).then(() => {
                        console.log('email updated')
                    }).catch((err) => {
                        isError = true;
                        console.log('email not updated')
                        window.alert(err);
                    });
                })
                .catch((error) => {
                    isError = true;
                    console.log("Can't log in, bad username/credentials or problem with server");
                    console.error(error);
                    // window.alert(error);
                })
            }
    
        }   


        // dodać: replace location
        
            
            // .finally(() => {
            //     if (isError!=true) {
            //         console.log('4')
            //         location.replace('/profile/' + props.userId)
            //     }
            // }
            // )
                


    }


    // dodać: error dla użytkownika (niepoprawny email lub hasło)

</script>


<style scoped>
input {
  padding: 7px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0,0,0,0.03);
  border-radius: 6px;
  margin-bottom: 10px;
}
.d-grid {
    margin-top: 30px;
    margin-bottom: 8px;
}

</style>