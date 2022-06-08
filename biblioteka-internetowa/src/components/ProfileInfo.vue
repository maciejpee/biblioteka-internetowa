<template>
    <div>
        <div v-if="!editInfo">
            <div class="row">
                <div class="col-md-11">
                    <h4 class="profile-title">Informacje o profilu</h4>
                </div>
                <div class="col-md-1">
                    <img @click="editInfo = true" class="icon" src="/edit.png" width="28" height="28" style="cursor: pointer;">
                </div>
            </div>
            <p class="profile-info"><b>Nick:</b> {{ profile.user_name }}</p>
            <p class="profile-info"><b>Imię:</b>  {{ profile.name }}</p>
            <p class="profile-info"><b>Nazwisko:</b> {{ profile.surname }}</p>
            <p class="profile-info"><b>Numer telefonu:</b> {{ profile.phone }}</p>
            <p class="profile-info"><b>Opis:</b></p>
            <p class="profile-info">{{ profile.desc }}</p>
        </div>
        <div v-if="editInfo">
            <div class="row">
                <div class="col-md-11">
                    <h4 class="profile-title">Informacje o profilu</h4>
                </div>
                <div class="col-md-1">
                    <img @click="changeProfileInfo" class="icon" src="/tick.png" width="38" height="38" style="cursor: pointer;">
                </div>
            </div>
            <form>
                <div class="row">
                    <div class="col-md-2">
                        <label for="inputLogin" class="profile-info"><b>Nick: </b></label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control edit green" id="inputLogin" v-model="profile.user_name" :class="loginWarning">
                    </div>
                    <div class="col-md-3">
                        <small v-show="loginAlertVisible" id="loginHelpBlock" class="form-text text-danger">
                        Nazwa użytkownika musi mieć co najmniej 5 znaków.
                        </small>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <label for="inputName" class="profile-info"><b>Imię: </b></label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control edit green" id="inputName" v-model="profile.name" :class="nameWarning">
                    </div>
                    <div class="col-md-3">
                        <small v-show="nameAlertVisible" id="nameHelpBlock" class="form-text text-danger">
                        Niepoprawne imię.
                        </small>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <label for="inputSurname" class="profile-info"><b>Nazwisko: </b></label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control edit green" id="inputSurname" v-model="profile.surname" :class="surnameWarning">
                    </div>
                    <div class="col-md-3">
                        <small v-show="surnameAlertVisible" id="surnameHelpBlock" class="form-text text-danger">
                        Niepoprawne nazwisko.
                        </small>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <label for="inputPhone" class="profile-info"><b>Numer telefonu: </b></label>
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control edit green" id="inputPhone" v-model="profile.phone" :class="phoneWarning">
                    </div>
                    <div class="col-md-3">
                        <small v-show="phoneAlertVisible" id="phoneHelpBlock" class="form-text text-danger">
                        Numer telefonu musi składać się z 9 cyfr.
                        </small>
                    </div>
                </div>

                <label for="inputDesc" class="profile-info"><b>Opis: </b></label>
                <div class="col-md-11">
                    <textarea class="form-control desc green" id="inputDesc" rows="3" v-model="profile.desc" :class="descWarning"></textarea>
                </div>
                <small v-show="descAlertVisible" id="descHelpBlock" class="form-text text-danger">
                    Opis nie może mieć więcej niż 200 znaków.
                </small>
            </form>
        </div>
        <hr>
        <ChangeCredentials/>
        <hr>

        <div>
            <h4 class="profile-title">Stan konta</h4>
            <p v-if="firestore" class="profile-info"><b>Wypożyczone: </b>{{ profile.borrowed.length }}</p>
            <p v-if="firestore" class="profile-info"><b>Oczekujące: </b>{{profile.waiting.length}}</p>
            <p class="profile-info"><b>Zaległości: </b>{{ profile.arrears }} zł</p>
            <button v-if="profile.arrears > 0" class="btn btn-success shadow-none" @click="payArreras">Ureguluj opłaty</button>
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
            profile.value["waiting"] = doc.data().waiting
            firestore.value = true
        })

         
        checkDelays()
        

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
        console.log('closed')
    }

    // sprawdzanie zaległości
    function checkDelays(){
        var currentDate = new Date()
        var today = firebase.firestore.Timestamp.fromDate(currentDate)
        console.log('Sprawdzam opłaty na dzień: ', currentDate);
        let stemValue = 0
        
        db.collection('users').doc(props.userId).get().then((doc)=>{
            if (doc.data().borrow_history){
                for(let [index, record] of Object.entries(doc.data().borrow_history)){
                
                    if(record.paid != 2){  // 2 - opłata uregulowana, 1 - nieuregulowana, 0 - brak kary
                        let paymentDiff = record.returnedDate.seconds - record.borrowDate.seconds
                        
                        if(paymentDiff >= 2629743 ){ // różnica większa niż miesiąc
                            stemValue += Math.ceil(((paymentDiff - 2629743) / 86400)) * 0.2                         
                            
                            db.collection('users').doc(props.userId).update({                               
                                
                                [`borrow_history.${index}.paid`]: 1  // nieuregulowana
                                
                            }) 
                        }
                    }                                      
                }
            }     
        }).then(() =>{
            db.collection('users').doc(props.userId).update({
                    arrears: stemValue.toFixed(2)  
            })
            profile.value.arrears = stemValue.toFixed(2)
        })
    }

    function payArreras(){
        db.collection('users').doc(props.userId).get().then((doc)=>{
            if (doc.data().borrow_history){
                for(let [index, record] of Object.entries(doc.data().borrow_history)){
                    if (record.paid == 1){  // 1 - nieopłacone
                        db.collection('users').doc(props.userId).update({
                                arrears: '0.00', // regulowanie opłat
                                [`borrow_history.${index}.paid`]: 2  
                                
                            }) 
                    }                        
                }
            }     
        }).then(() => {
            var zero = 0
            profile.value.arrears = zero.toFixed(2)
        })
        
    }
</script>

<style scoped>
.profile-info {
    margin-top: 10px;
    margin-left: 20px;
    line-height: 1.87;
}
img.icon {
    margin: 15px 0px 10px 0px;
}

hr {
    margin: 35px 0px 25px 0px;
    height: 1px;
}

.btn {
    margin-top: 20px;
    margin-left: 20px;
}
textarea.desc {
    margin-left: 20px;
    margin-top: 15px;
}
input.edit {
    margin: 4px 0px 4px 0px;
    padding: 6px 10px 6px 10px;
}
</style>