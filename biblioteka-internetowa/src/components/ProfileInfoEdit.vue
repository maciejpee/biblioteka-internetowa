<template>
    <div class="mainDiv">
        <div class="container">
            <form class="row g-3 justify-content-md-center" @submit.prevent="addBook">

                <div class="col-md-2"></div>
                <div class="col-md-4">
                    <label for="inputLogin" class="form-label">Nazwa użytkownika</label>
                    <input type="text" class="form-control" id="inputLogin" v-model="login" :class="loginWarning" :placeholder="profile.user_name">
                    <small v-show="loginAlertVisible" id="loginHelpBlock" class="form-text text-danger">
                    Nazwa użytkownika musi mieć co najmniej 5 znaków.
                    </small>
                </div>
                
                <div class="col-md-4">
                    <label for="inputPhone" class="form-label">Numer telefonu</label>
                    <input type="text" class="form-control" id="inputPhone" v-model="phone" :class="phoneWarning" :placeholder="profile.phone">
                    <small v-show="phoneAlertVisible" id="phoneHelpBlock" class="form-text text-danger">
                    Numer telefonu musi składać się z 9 cyfr.
                    </small>
                </div>
                <div class="col-md-2"></div>

                <div class="col-md-2"></div>
                <div class="col-md-4">
                    <label for="inputName" class="form-label">Imię</label>
                    <input type="text" class="form-control" id="inputName" v-model="name" :class="nameWarning" :placeholder="profile.name">
                    <small v-show="nameAlertVisible" id="nameHelpBlock" class="form-text text-danger">
                    Niepoprawne imię.
                    </small>
                </div>

                <div class="col-md-4">
                    <label for="inputSurname" class="form-label">Nazwisko</label>
                    <input type="text" class="form-control" id="inputSurname" v-model="surname" :class="surnameWarning" :placeholder="profile.surname">
                    <small v-show="surnameAlertVisible" id="surnameHelpBlock" class="form-text text-danger">
                    Niepoprawne nazwisko.
                    </small>
                </div>
                <div class="col-md-2"></div>

                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <label for="inputDesc" class="form-label field">Opis</label>
                    <textarea class="form-control" id="inputDesc" rows="8" v-model="desc" :class="descWarning" :placeholder="profile.desc"></textarea>
                    <small v-show="descAlertVisible" id="descHelpBlock" class="form-text text-danger">
                    Niepoprawny opis.
                    </small>
                </div>
                <div class="col-md-2"></div>

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

    const login = ref("")
    const desc = ref("")
    const phone = ref("")
    const name = ref("")
    const surname = ref("")

    const auth = firebase.auth()
    const errors = ref(new Set([]))
    const props = defineProps(['userId'])

    const loginAlertVisible = ref(false)
    const descAlertVisible = ref(false)
    const phoneAlertVisible = ref(false)
    const nameAlertVisible = ref(false)
    const surnameAlertVisible = ref(false)

    const loginWarning = ref('')
    const descWarning = ref('')
    const phoneWarning = ref('')
    const nameWarning = ref('')
    const surnameWarning = ref('')

    const profile = ref({})

    db.collection("users").doc(props.userId).get().then((doc) => {
        profile.value["user_name"] = doc.data().user_name
        profile.value["desc"] = doc.data().desc
        profile.value["phone"] = doc.data().phone
        profile.value["name"] = doc.data().name
        profile.value["surname"] = doc.data().surname
    })

    function changeProfileInfo () {
        loginAlertVisible.value = false
        descAlertVisible.value = false
        phoneAlertVisible.value = false
        nameAlertVisible.value = false
        surnameAlertVisible.value = false

        loginWarning.value = ''
        descWarning.value = ''
        phoneWarning.value = ''
        nameWarning.value = ''
        surnameWarning.value = ''

        if (login.value.length < 5 && login.value.length > 0 ) {
            loginAlertVisible.value = true;
            loginWarning.value = 'border-danger'
            errors.value.add('login')
        } else {
            errors.value.delete('login')
        }

        if ( !(/^[0-9]{9}/.test(phone.value) || phone.value ==="" ) ) {
            phoneAlertVisible.value = true;
            phoneWarning.value = 'border-danger'
            errors.value.add('phone')
        } else {
            errors.value.delete('phone')
        }

        if ( name.value.length < 3 && name.value.length > 0 ) {
            nameAlertVisible.value = true;
            nameWarning.value = 'border-danger'
            errors.value.add('name')
        } else {
            errors.value.delete('name')
        }

        if ( surname.value.length < 3 && surname.value.length > 0 ) {
            surnameAlertVisible.value = true;
            surnameWarning.value = 'border-danger'
            errors.value.add('surname')
        } else {
            errors.value.delete('surname')
        }

        if (errors.value.size == 0) {
            const update = {}
            if (desc.value!="") {
                update.desc = desc.value
            }
            if (phone.value!="") {
                update.phone = phone.value
            }
            if (name.value!="") {
                update.name = name.value
            }
            if (surname.value!="") {
                update.surname = surname.value
            }
            if (login.value!="") {
                update.user_name = login.value
            }

            const user = auth.currentUser;
            db.collection('users').doc(props.userId).update(update)
            .then(() => { location.replace('/profile/' + props.userId)} )
            .catch(function(err) {
                console.error(err);
                console.log('profile info not updated')
            });

            // const user = auth.currentUser;
            // db.collection('users').doc(props.userId).update({
            //    desc: desc.value,
            //    phone: phone.value,
            //    name: name.value,
            //    surname: surname.value,
            //    user_name: login.value,
            // })
        

            // dodać: przeniesienie na stronę profilu
            // dodać: jeżeli użytkownik nie wpisze danych, nie zmieniamy niczego w bazie


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