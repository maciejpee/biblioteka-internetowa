<template>
    <div id="mainDiv">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation" @click="refresh">
                <button class="nav-link active" id="info-tab" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="true">Dane użytkownika</button>
            </li>

            <li class="nav-item" role="presentation">
                <button class="nav-link" id="borrowed-tab" data-bs-toggle="tab" data-bs-target="#borrowed" type="button" role="tab" aria-controls="borrowed" aria-selected="false">Wypożyczone</button>
            </li>

            <li class="nav-item" role="presentation">
                <button class="nav-link" id="waiting-tab" data-bs-toggle="tab" data-bs-target="#waiting" type="button" role="tab" aria-controls="waiting" aria-selected="false">Oczekujące</button>
            </li>

            <li class="nav-item" role="presentation">
                <button class="nav-link" id="favourite-tab" data-bs-toggle="tab" data-bs-target="#favourite" type="button" role="tab" aria-controls="favourite" aria-selected="false">Ulubione</button>
            </li>
        </ul>
        
        <div class="tab-content" id="myTabContent">

            <div class="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
                <ProfileInfo v-if="firestore" :userId="props.userId"/>
            </div>

            <div class="tab-pane fade" id="borrowed" role="tabpanel" aria-labelledby="borrowed-tab">
                <Borrowed v-if="firestore" :userId="props.userId" :borrowed="profile.borrowed"/>
            </div>

            <div class="tab-pane fade" id="waiting" role="tabpanel" aria-labelledby="waiting-tab">
                Oczekujące
            </div>

            <div class="tab-pane fade" id="favourite" role="tabpanel" aria-labelledby="favourite-tab">
                <Favourites v-if="firestore" :userId="props.userId" :favs="profile.favourites"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import Favourites from './Favourites.vue'
    import Borrowed from './Borrowed.vue'
    import ProfileInfo from './ProfileInfo.vue'


    const props = defineProps(['userId'])
    const profile = ref({})
    const firestore = ref(false)

    onMounted(() => {
        db.collection("users").doc(props.userId).get().then((doc) => {
            profile.value["borrowed"] = doc.data().borrowed
            profile.value["favourites"] = doc.data().favourites
            firestore.value = true
        })
    })

    function refresh () {
        db.collection("users").doc(props.userId).get().then((doc) => {
            profile.value["arrears"] = doc.data().arrears
            profile.value["borrowed"] = doc.data().borrowed
        })
    }
</script>

<style scoped>
.d-grid {
    margin: 0 10px 0 10px;
}
</style>