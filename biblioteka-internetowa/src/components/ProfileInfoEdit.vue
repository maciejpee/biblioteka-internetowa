<template>
    <div id="mainDiv">
        <div class="container">
            <form class="row g-3 justify-content-md-center" @submit.prevent="addBook">

                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <label for="inputLogin" class="form-label">Nazwa użytkownika</label>
                    <input type="text" class="form-control" id="inputLogin" v-model="title" :class="loginWarning">
                    <small v-show="loginAlertVisible" id="titleHelpBlock" class="form-text text-danger">
                    Nazwa użytkownika musi mieć co najmniej 5 znaków.
                    </small>
                </div>
                <div class="col-md-1"></div>
                
                <div class="col-md-4">
                    <label for="inputEmail" class="form-label">Email</label>
                    <input type="text" class="form-control" id="inputEmail" v-model="email" :class="emailWarning">
                    <small v-show="emailAlertVisible" id="emailHelpBlock" class="form-text text-danger">
                    Email nie może być pusty.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <label for="inputPhone" class="form-label">Numer telefonu</label>
                    <input type="text" class="form-control" id="inputPhone" v-model="phone" :class="phoneWarning">
                    <small v-show="phoneAlertVisible" id="phoneHelpBlock" class="form-text text-danger">
                    Numer telefonu musi składać się z 9 cyfr.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-4">
                    <label for="inputPassword" class="form-label">Wpisz aktualne hasło</label>
                    <input type="text" class="form-control" id="inputPassword" v-model="password" :class="passwordWarning">
                    <small v-show="passwordAlertVisible" id="passwordHelpBlock" class="form-text text-danger">
                    Niepoprawne hasło.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <label for="inputDesc" class="form-label field">Opis</label>
                    <textarea class="form-control" id="inputDesc" rows="8" v-model="desc" :class="descWarning"></textarea>
                    <small v-show="descAlertVisible" id="descHelpBlock" class="form-text text-danger">
                    Niepoprawny opis.
                    </small>
                </div>
                <div class="col-md-1"></div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group text-center">
                        <button type="submit" class="btn btn-primary d-grid" id="btnChangeInfo" style="width:250px" @click="changeProfileInfo">Potwierdź</button>     
                    </div>          
                </div>

            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    //const login = dotychczasowa nazwa użytkownika
    //const email = dotychczasowy email
    const desc = ref(null)
    const phone = ref(null)
    const password = ref("")

    const errors = ref(new Set([]))
    const props = defineProps(['userId'])

    // onMounted(() => {
    //     db.collection("users").doc(props.userId).get().then((doc) => {
    //         profile.value["userName"] = doc.data().user_name
    //     })
    // })

    const loginAlertVisible = ref(false)
    const emailAlertVisible = ref(false)
    const passwordAlertVisible = ref(false)
    const descAlertVisible = ref(false)
    const phoneAlertVisible = ref(false)

    const loginWarning = ref('')
    const emailWarning = ref('')
    const passwordWarning = ref('')
    const descWarning = ref('')
    const phoneWarning = ref('')


    function changeProfileInfo () {
        loginAlertVisible.value = false
        emailAlertVisible.value = false
        passwordAlertVisible.value = false
        descAlertVisible.value = false
        phoneAlertVisible.value = false

        loginWarning.value = ''
        emailWarning.value = ''
        passwordWarning.value = ''
        descWarning.value = ''
        phoneWarning.value = ''

        if (login.value.length < 5 || login.value == ""){
            loginAlertVisible.value = true;
            loginWarning.value = 'border-danger'
            errors.value.add('login')
        } else {
            errors.value.delete('login')
        }

        if ( !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) ){
            emailAlertVisible.value = true;
            emailWarning.value = 'border-danger'
            errors.value.add('email')
        } else {
            errors.value.delete('email')
        }

        if ( !(/^[0-9]{9}/.test(phone.value)) ){
            loginAlertVisible.value = true;
            loginWarning.value = 'border-danger'
            errors.value.add('phone')
        } else {
            errors.value.delete('phone')
        }

        // sprawdzenie zgodności hasła?

        // zapisanie nowych danych jeśli nie ma errorów


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