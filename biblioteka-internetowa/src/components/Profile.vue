<template>
    <div id="mainDiv">
        <h1>{{ profile.userName }}</h1>
        <h5>Stan konta</h5>
        <p v-if="db_check">Wypożyczone: {{ profile.borrowed.length }}</p>
        <p>Oczekujące: </p>
        <p>Zaległości: {{ profile.arrears }} zł</p>

        <button class="btn btn-danger" @click="logout">Wyloguj się</button>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'

    const props = defineProps(['userId'])
    const profile = ref({})
    const db_check = ref(false)

    onMounted(() => {
        db.collection("users").doc(props.userId).get().then((doc) => {
            profile.value["userName"] = doc.data().user_name
            profile.value["arrears"] = doc.data().arrears
            profile.value["borrowed"] = doc.data().borrowed
            db_check.value = true
        })
    })

    function logout() {
        firebase.auth().signOut()
        location.replace('/')
    }
</script>