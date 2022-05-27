<template>
    <div id="mainDiv">
        <p>{{ userId }}</p>
        <button class="btn btn-danger" @click="logout">Wyloguj się</button>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'

    const props = defineProps(['userId'])

    onMounted(() => {
        console.log(props.userId)
    })

    function logout() {
        firebase.auth().signOut()
        location.replace('/')
    }
</script>