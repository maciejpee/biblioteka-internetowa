<template>
    <div id="mainDiv">
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
                        <button type="submit" class="btn btn-primary d-grid" id="btnChangePassword" style="width:250px" @click="changePasswordAndEmail">Potwierdź</button>     
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

        if (newPassword1.value.length < 6) {
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

        if ( !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.value)) ) {
            newEmailAlertVisible.value = true;
            newEmailWarning.value = 'border-danger'
            errors.value.add('newEmail')
        } else {
            errors.value.delete('newEmail')
        }


        // login with email and old password and change to the new password
        if (errors.value.size == 0) {
            const user = auth.currentUser;
            firebase.auth()
            .signInWithEmailAndPassword(email.value, oldPassword.value)
            .then(function(user) {
                firebase.auth().currentUser.updatePassword(newPassword1.value).then(function(){
                    console.log('password updated');
                    location.replace('/profile' + props.userId);

                }).catch(function(err){
                    console.error(err);
                    console.log('update unsuccessful')
                });

            }).catch(function(err){
                console.error(err);
                console.log('invalid email or old password')
            });

            user.updateEmail(newEmail.value).then(() => {
                console.log('email updated')
            }).catch(function(err){
                console.error(err);
                console.log('error')
            });
        }
    }


    // dodać: error dla użytkownika (niepoprawny email lub hasło)
    // dodać: nieobowiązkowe pola
    // problem: id po zmianie hasła i emaila

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