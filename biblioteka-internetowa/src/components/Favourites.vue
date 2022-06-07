<template>
    <h4 class="profile-title-list">Twoje ulubione książki:</h4>
    <div class="row" v-for="f of favs">

        <!-- <div class="profile-book"> -->
            <div class="col-md-3">
                <img :src="f.cover" class="cover" />
            </div>
            <div class="col-md-9">
                <p><router-link :to="{ name : 'Details', params:{bookId: f.id}}">{{ f.title }}</router-link></p>
                <p>{{f.author}}</p>
                <p v-if="f.series">{{f.series}} Tom {{f.volume}}</p>
            </div>
            <hr>
        <!-- </div> -->

    </div>

</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps(["userId", "favs"])
    const favs = ref([])

    onMounted(() => {
        for (let i = 0; i < props.favs.length; i++) {
            db.collection("books").doc(props.favs[i]).get().then((doc) => {
                var data = {
                    "author": doc.data().author,
                    "title": doc.data().title,
                    "series": doc.data().series,
                    "volume": doc.data().volume,
                    "genre": doc.data().genre,
                    "cover": doc.data().cover,
                    "id": doc.id,
                }
                favs.value.push(data)
            })
        }
    })
</script>

<style scoped>
img.cover {
    width: 65%;
    height: auto;
    margin-left: 20px;
  }
a {
    font-size: 18px;
}
p {
  font-size: 15px;
  opacity: 0.8;
}
hr {
    margin: 50px 0px 40px 0px;
}

a:link, a:visited{
	text-decoration: underline;
	color: #0f7c05;
    font-weight: 600;
}
a:hover, a:active{
  color: #0e6406;
}


</style>