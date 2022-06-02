<template>
    <div id="mainDiv">
        <h1>{{ profile.userName }}</h1>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Dane użytkownika</button>
            </li>

            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Wypożyczone</button>
            </li>

            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Ulubione</button>
            </li>
        </ul>
        
        <div class="tab-content" id="myTabContent">

            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <h5>Stan konta</h5>
                <p v-if="firestore">Wypożyczone: {{ profile.borrowed.length }}</p>
                <p>Oczekujące: </p>
                <p>Zaległości: {{ profile.arrears }} zł</p>
            </div>

            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <Borrowed v-if="firestore" :userId="props.userId" :bors="profile.borrowed"/>
            </div>

            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <Favourites v-if="firestore" :userId="props.userId" :favs="profile.favourites"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import Favourites from "./Favourites.vue"
    import Borrowed from './Borrowed.vue';


    const props = defineProps(['userId'])
    const profile = ref({})
    const firestore = ref(false)

    onMounted(() => {
        db.collection("users").doc(props.userId).get().then((doc) => {
            profile.value["userName"] = doc.data().user_name
            profile.value["arrears"] = doc.data().arrears
            profile.value["borrowed"] = doc.data().borrowed
            profile.value["favourites"] = doc.data().favourites
            firestore.value = true
        })
    })
</script>