<template>
    <div id="mainDiv">
        <p>{{userId}}</p>
        <button class="btn btn-danger" @click="logout">Wyloguj się</button>
    </div>
</template>

<script>

export default {
    props: ["userId"],
    created() {
        console.log(this.userId)
    },
    methods: {
        logout(){
            firebase.auth().signOut()
            location.replace('/')
        }
    }
}

</script>
