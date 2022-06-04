<template>
    <div id="mainDiv">
        <div class="container">
            <form class="row g-3 justify-content-md-center" @submit.prevent="addBook">

                <div class="col-xl-3 col-lg-3"></div>
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <label for="inputEmail" class="form-label">Email</label>
                    <input type="text" class="form-control" id="inputEmail" v-model="email" :class="emailWarning">
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
                    <label for="inputNewPassword1" class="form-label">Nowe hasło</label>
                    <input type="password" class="form-control" :class="newPassword1Warning" id="inputNewPassword1" v-model="newPassword1">
                    <small v-show="passwordLengthlAlertVisible" id="newPassword1HelpBlock" class="form-text text-danger">
                    Hasło powinno mieć co najmniej 8 znaków.
                    </small>
                </div>
                <div class="col-xl-3 col-lg-3"></div>

                <div class="col-xl-3 col-lg-3"></div>
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <label for="inputNewPassword2" class="form-label">Powtórz nowe hasło</label>
                    <input type="password" class="form-control" :class="newPassword2Warning" id="inputNewPassword2" v-model="newPassword2">
                    <small v-show="passwordDifferencelAlertVisible" id="newPassword2HelpBlock" class="form-text text-danger">
                    Hasła różnią się.
                    </small>
                </div>
                <div class="col-xl-3 col-lg-3"></div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group text-center">
                        <button type="submit" class="btn btn-primary d-grid" id="btnChangePassword" style="width:250px" @click="changePassword">Potwierdź</button>     
                    </div>          
                </div>
                
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const email = ref(null)
    const oldPassword = ref(null)
    const newPassword1 = ref(null)
    const newPassword2 = ref(null)
    const auth = firebase.auth()

    const errors = ref(new Set([]))
    const props = defineProps(['userId'])

    const emailAlertVisible = ref(false)
    const oldPasswordAlertVisible = ref(false)
    const passwordLengthlAlertVisible = ref(false)
    const passwordDifferencelAlertVisible = ref(false)

    const emailWarning = ref('')
    const oldPasswordWarning = ref('')
    const newPassword1Warning = ref('')
    const newPassword2Warning = ref('')

    function changePassword () {
        emailAlertVisible.value = false
        oldPasswordAlertVisible.value = false
        passwordLengthlAlertVisible.value = false
        passwordDifferencelAlertVisible.value = false

        emailWarning.value = ''
        oldPasswordWarning.value = ''
        newPassword1Warning.value = ''
        newPassword2Warning.value = ''

        if (newPassword1.value.length < 6) {
            passwordLengthlAlertVisible.value = true;
            newPassword1Warning.value = 'border-danger'
            errors.value.add('newPassword1')
        } else {
            errors.value.delete('newPassword1')
        }

        if (newPassword1.value != newPassword2.value) {
            passwordDifferencelAlertVisible.value = true;
            newPassword2Warning.value = 'border-danger'
            errors.value.add('newPassword2')
        } else {
            errors.value.delete('newPassword2')
        }


        // login with email and old password and change to the new password
        if (errors.value.size == 0) {
            const user = auth.currentUser;
            firebase.auth()
            .signInWithEmailAndPassword(email.value, oldPassword.value)
            .then(function(user) {
                firebase.auth().currentUser.updatePassword(newPassword1.value).then(function(){
                    console.log('password updated');
                    location.replace('/profile/:userId');

                }).catch(function(err){
                    console.error(err);
                    console.log('password not updated')
                });

            }).catch(function(err){
                console.error(err);
                console.log('invalid email or old password')
            });
        }
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