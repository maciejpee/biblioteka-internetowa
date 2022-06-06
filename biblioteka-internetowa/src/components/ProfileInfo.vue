<template>
    <div>
        <div v-if="!editInfo">
            <div class="row">
                <div class="col-md-11">
                    <h4>Informacje o profilu</h4>
                </div>
                <div class="col-md-1">
                    <img @click="editInfo = true" class="icon" src="/edit.png" width="28" height="28" style="cursor: pointer;">
                </div>
            </div>
            <p>Nazwa użytkownika: {{ profile.user_name }}</p>
            <p>Imię: {{ profile.name }}</p>
            <p>Nazwisko: {{ profile.surname }}</p>
            <p>Numer telefonu: {{ profile.phone }}</p>
            <p>Opis:</p>
            <p>{{ profile.desc }}</p>
        </div>
        <div v-if="editInfo">
            <div class="row">
                <div class="col-md-11">
                    <h4>Informacje o profilu</h4>
                </div>
                <div class="col-md-1">
                    <img @click="changeProfileInfo" class="icon" src="/tick.png" width="38" height="38" style="cursor: pointer;">
                </div>
            </div>
            <form>
                <div class="row">
                    <div class="col-md-2">
                        <label for="inputLogin" class="form-label">Nazwa użytkownika: </label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="inputLogin" v-model="profile.user_name" :class="loginWarning">
                    </div>
                    <div class="col-md-3">
                        <small v-show="loginAlertVisible" id="loginHelpBlock" class="form-text text-danger">
                        Nazwa użytkownika musi mieć co najmniej 5 znaków.
                        </small>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <label for="inputName" class="form-label">Imię: </label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="inputName" v-model="profile.name" :class="nameWarning">
                    </div>
                    <div class="col-md-3">
                        <small v-show="nameAlertVisible" id="nameHelpBlock" class="form-text text-danger">
                        Niepoprawne imię.
                        </small>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <label for="inputSurname" class="form-label">Nazwisko: </label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="inputSurname" v-model="profile.surname" :class="surnameWarning">
                    </div>
                    <div class="col-md-3">
                        <small v-show="surnameAlertVisible" id="surnameHelpBlock" class="form-text text-danger">
                        Niepoprawne nazwisko.
                        </small>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <label for="inputPhone" class="form-label">Numer telefonu: </label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="inputPhone" v-model="profile.phone" :class="phoneWarning">
                    </div>
                    <div class="col-md-3">
                        <small v-show="phoneAlertVisible" id="phoneHelpBlock" class="form-text text-danger">
                        Numer telefonu musi składać się z 9 cyfr.
                        </small>
                    </div>
                </div>
                <label for="inputDesc" class="form-label field">Opis: </label>
                <textarea class="form-control" id="inputDesc" rows="2" v-model="profile.desc" :class="descWarning"></textarea>
                <small v-show="descAlertVisible" id="descHelpBlock" class="form-text text-danger">
                    Opis nie może mieć więcej niż 200 znaków.
                </small>
            </form>
        </div>
        <hr>
        <ChangeCredentials/>
        <hr>

        <div>
            <h4>Stan konta</h4>
            <p v-if="firestore">Wypożyczone: {{ profile.borrowed.length }}</p>
            <p>Oczekujące: </p>
            <p>Zaległości: {{ profile.arrears }} zł</p>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import ChangeCredentials from "./ChangeCredentials.vue"

    const props = defineProps(['userId'])
    const errors = ref(new Set([]))

    const auth = firebase.auth()
    const profile = ref({})
    const firestore = ref(false)
    const editInfo = ref(false)
    const credentialsModal = ref(false)

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

    onMounted(() => {
        db.collection("users").doc(props.userId).get().then((doc) => {
            profile.value["borrowed"] = doc.data().borrowed
            profile.value["favourites"] = doc.data().favourites
            profile.value["arrears"] = doc.data().arrears
            profile.value["user_name"] = doc.data().user_name
            profile.value["name"] = doc.data().name
            profile.value["surname"] = doc.data().surname
            profile.value["phone"] = doc.data().phone
            profile.value["desc"] = doc.data().desc
            firestore.value = true
        })

        // oplaty 
        //checkDelays()
        

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

        if (profile.value['user_name'].length < 5 || profile.value['user_name'] == '' ) {
            loginAlertVisible.value = true;
            loginWarning.value = 'border-danger'
            errors.value.add('login')
        } else {
            errors.value.delete('login')
        }

        if ( typeof profile.value['phone'] ==='string') {
            if ( profile.value['phone'].length > 0 &&  !(/^[0-9]{9}$/.test(profile.value['phone'])) ) {
                phoneAlertVisible.value = true;
                phoneWarning.value = 'border-danger'
                errors.value.add('phone')
            } else {
                errors.value.delete('phone')
            }
        }

        if ( typeof profile.value['name'] ==='string') {
            if ( profile.value['name'].length < 3 && profile.value['name'].length > 0 ) {
                nameAlertVisible.value = true;
                nameWarning.value = 'border-danger'
                errors.value.add('name')
            } else {
            errors.value.delete('name')
            }
        }

        if ( typeof profile.value['surname'] ==='string') {
            if ( profile.value['surname'].length < 3 && profile.value['surname'].length > 0 ) {
                surnameAlertVisible.value = true;
                surnameWarning.value = 'border-danger'
                errors.value.add('surname')
            } else {
            errors.value.delete('surname')
            }
        }

        if ( typeof profile.value['desc'] ==='string') {
            let descRemoveSpaces = profile.value['desc'].replace(/ /g, "")
            if ( profile.value['desc'].length > 0 &&  descRemoveSpaces.length > 200 ) {
                descAlertVisible.value = true;
                phoneWarning.value = 'border-danger'
                errors.value.add('desc')
            } else {
                errors.value.delete('desc')
            }
        }

        if (errors.value.size == 0) {
            const update = {}

            if (profile.value['desc']!=undefined) {
                update.desc = profile.value['desc']
            } else {
                update.desc = ''
            }

            if (profile.value['phone']!=undefined) {
                update.phone = profile.value['phone']
            } else {
                update.phone = ''
            }

            if (profile.value['name']!=undefined) {
                update.name = profile.value['name']
            } else {
                update.name = ''
            }

            if (profile.value['surname']!=undefined) {
                update.surname = profile.value['surname']
            } else {
                update.surname = ''
            }

            if (profile.value['user_name']!=undefined) {
                update.user_name = profile.value['user_name']
            } else {
                update.user_name = ''
            }

            const user = auth.currentUser;
            db.collection('users').doc(props.userId).update(update)   
            editInfo.value = false        
        }

    }

    function closeModal() {
        console.log('hej')
    }

    function checkDelays(){
        var currentDate = new Date()
        var today = firebase.firestore.Timestamp.fromDate(currentDate)
        var paidComplete = true
        // month = 2 629 743 sec
        // day = 86 400
        // wychodzi ~ 6zl kary za miesiac
        db.collection('users').doc(props.userId).get().then((doc)=>{
            if (doc.data().borrow_history){
                for(let [index, record] of Object.entries(doc.data().borrow_history)){
                    if(!record.paid){
                        if(record.returnedDate.seconds - record.borrowDate.seconds >= 2629743 ){
                            db.collection('users').doc(props.userId).update({
                                arrears: firebase.firestore.FieldValue.increment(6),
                                [`borrow_history.${index}.paid`]: true  
                            }) 
                        }
                    }                                      
                }
            }     
        })
    }
</script>

<style scoped>
    .d-grid {
        margin: 0 10px 0 10px;
    }

    img.icon {
        margin: 15px 10px 10px 0px;
    }

</style>