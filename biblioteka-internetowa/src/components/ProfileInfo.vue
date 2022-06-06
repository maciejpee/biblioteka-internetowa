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
            <text class="profile-info">Nazwa użytkownika:</text> <text>{{ profile.user_name }}</text><br/>
            <text class="profile-info">Imię: </text> <text>{{ profile.name }}</text><br/>
            <text class="profile-info">Nazwisko: </text> <text>{{ profile.surname }}</text><br/>
            <text class="profile-info">Numer telefonu: </text> <text>{{ profile.phone }}</text><br/>
            <text class="profile-info">Opis:</text><br/>
            <text>{{ profile.desc }}</text>
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
            <h4 class="profile-title">Stan konta</h4>
            <p v-if="firestore">Wypożyczone: {{ profile.borrowed.length }}</p>
            <p>Oczekujące: </p>
            <p>Zaległości: {{ profile.arrears }} zł</p>
            <button class="btn btn-success shadow-none" @click="payArreras">Ureguluj opłaty</button>
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
        console.log('hej')
    }

    function checkDelays(){
        // check delays dziala zawsze jak wejdziecie se na profil to zawsze trigeruej sie raz
        // zeby sprawdzic czy jestescie wrogiem publicznym
        var currentDate = new Date()
        var today = firebase.firestore.Timestamp.fromDate(currentDate)
        console.log('Sprawdzam opłaty na dzień: ', currentDate);
        // month = 2 629 743 sec
        // day = 86 400
        // wychodzi ~ 6zl kary za miesiac
        db.collection('users').doc(props.userId).get().then((doc)=>{
            if (doc.data().borrow_history){ // jesli istnieje historia
                for(let [index, record] of Object.entries(doc.data().borrow_history)){ // iterowanie
                // po obiekcie wyglada tak. Index to id obiektu (tamto wygenreowane pythonowo)
                // record to sam obiekt w obiekcie, wiec mamy dostep do jego atrybutów
                    if(record.paid != 2){ // jesli nie jest rowne 2 (2 oznacza uregulowana oplata)
                    // jesli nie jest 2 tzn ze albo jest 1 - nie oplacona albo 0 - brak kary
                        let paymentDiff = record.returnedDate.seconds - record.borrowDate.seconds
                        // roznica pomiedzy datami zwrotu a wypozyczenia (w sekundach najlatwiej bo time
                        // stampy)
                        if(paymentDiff >= 2629743 ){ // jesli roznica wieksza niz miesiac to do łagrów
                            let stemValue = ((paymentDiff - 2629743) / 86400) * 0.2
                            // wzor na obliczanie ile do zapłaty, roznica - miesiac (zeby jakby liczylo tylko
                            // nadwyzke po miesiacu) przez 76400 sekund bo tyle ma dzien, * 0.2 bo 20 groszy za dzien
                            // 5 dni ponad miesiac (okreslony termin, mozna zmienic ewentualnie) = 1zł kary itd
                            db.collection('users').doc(props.userId).update({
                                // increment dodaje po prostu do obecnej wartosci, cos jak 
                                // arrears = arrears + kara wiesz czemu to chujowo działa to też
                                // tak bo wzor zobacz wyzej nalicza raz
                                // tylko ze jak jest minalna rozncia to sie pewnie bugguje  zaraz obczaje chodz fb
                                arrears: firebase.firestore.FieldValue.increment(stemValue),
                                [`borrow_history.${index}.paid`]: 1  // paid jako 1, bo nie uregulowana i mamy
                                // do zaplaty, czesc 3cia nizej
                            }) 
                        }
                    }                                      
                }
            }     
        })
    }

    function payArreras(){
        // magiczne placenie oplaty (rozwiazanie najprostsze bo brak czasu, mozna zmienic potem)
        // zmiana to pewnie 15-20 min czy cos
        db.collection('users').doc(props.userId).get().then((doc)=>{
            if (doc.data().borrow_history){
                for(let [index, record] of Object.entries(doc.data().borrow_history)){
                    if (record.paid == 1){ // tym razem patrzy tylko na te nie oplacone
                        db.collection('users').doc(props.userId).update({
                                arrears: 0, // zeruje oplaty (magicznie)
                                [`borrow_history.${index}.paid`]: 2  // zmienia na oplacone
                                // przez co funkcja wyzej nie trigeruje sie na nie i nie nalicze za nie
                                // oplat
                            }) 
                    }                        
                }
            }     
        })
    }
</script>

<style scoped>

img.icon {
    margin: 15px 0px 10px 0px;
}
.profile-info {
    font-weight: bold;
    margin-top: 10px;
}
hr {
    margin: 45px 0px 10px 0px;
}
.btn {
    margin: 0 10px 0 10px;
}


</style>