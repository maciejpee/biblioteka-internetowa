<template>
    <div class="mainDiv">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation" @click="refresh">
                <button class="nav-link active" id="info-tab" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="true"><text>Dane użytkownika</text></button>
            </li>

            <li class="nav-item" role="presentation">
                <button class="nav-link" id="borrowed-tab" data-bs-toggle="tab" data-bs-target="#borrowed" type="button" role="tab" aria-controls="borrowed" aria-selected="false"><text>Wypożyczone</text></button>
            </li>

            <li class="nav-item" role="presentation">
                <button class="nav-link" id="waiting-tab" data-bs-toggle="tab" data-bs-target="#waiting" type="button" role="tab" aria-controls="waiting" aria-selected="false"><text>Oczekujące</text></button>
            </li>

            <li class="nav-item" role="presentation">
                <button class="nav-link" id="favourite-tab" data-bs-toggle="tab" data-bs-target="#favourite" type="button" role="tab" aria-controls="favourite" aria-selected="false"><text>Ulubione</text></button>
            </li>

            <li class="nav-item" role="presentation">
                <button class="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false"><text>Historia</text></button>
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
                <Waiting v-if="firestore" :userId="props.userId" :waiting="profile.waiting"/>
            </div>

            <div class="tab-pane fade" id="favourite" role="tabpanel" aria-labelledby="favourite-tab">
                <Favourites v-if="firestore" :userId="props.userId" :favs="profile.favourites"/>
            </div>

            <div class="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                <History v-if="firestore" :userId="props.userId" :borrowHistory="profile.borrow_history"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import Favourites from './Favourites.vue'
    import Borrowed from './Borrowed.vue'
    import ProfileInfo from './ProfileInfo.vue'
    import Waiting from './Waiting.vue'
    import History from './History.vue'


    const props = defineProps(['userId'])
    const profile = ref({})
    const firestore = ref(false)

    onMounted(() => {
        db.collection("users").doc(props.userId).get().then((doc) => {
            profile.value["borrowed"] = doc.data().borrowed
            profile.value["favourites"] = doc.data().favourites
            profile.value["waiting"] = doc.data().waiting
            profile.value["borrow_history"] = doc.data().borrow_history
            firestore.value = true
        })
    })

    function refresh () {
        db.collection("users").doc(props.userId).get().then((doc) => {
            profile.value["arrears"] = doc.data().arrears
            profile.value["borrowed"] = doc.data().borrowed
            profile.value["waiting"] = doc.data().waiting
            profile.value["borrow_history"] = doc.data().borrow_history
        })
    }
</script>

<style scoped>
.nav.nav-tabs {
    background-color: #ffffff;
}
.nav-tabs li text {
  color: rgb(61, 61, 61);
}
.nav-tabs .nav-item .nav-link.active text {
  color: #0f7c05;
}
.tab-content {
  border: 1px solid #dee2e6;
  border-top: transparent;
  padding: 25px 25px 25px 25px;
}

</style>