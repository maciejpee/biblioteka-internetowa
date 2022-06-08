<template>
    <div>
      <h4>{{ genre.charAt(0).toUpperCase() + genre.slice(1) }}</h4>
      <div class="row justify-content-center">
        <div v-for="b of genreBooks" :key="b" class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 py-2">
          <router-link :to="{name:'Details', params:{bookId: b.bookId}}" custom v-slot="{ navigate }">
          <div class="card h-100" role="link" @click="navigate">
            <img :src=b.cover class="card-img cover-small">
            
            <div class="card-body">
              <text class="card-title">{{ b.title }}</text>
            </div>
        
            <div class="card-footer">
              <text class="card-author">{{ b.author }}</text>
            </div>
          </div>
          </router-link>
        </div>
      </div><hr>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps(["genre"])
    const genre = props.genre
    const genreBooks = ref([])
    const genresObj = ref({
        'fantasy': [
            '6QFu4m2jOIqjHO8lET1J', '6k243kM53SAMYHgMeyu6', '7JywpMTEj93SQfgFnAXj', 'CXxCw4w1pzGAAIi7MOck',
            'GvgzEXGoElZNZn8c5y2J', 'IyTldfMn4m0EHZV04p9O', 'Nxr7BWexah2pr68g9e6Q', 'iDdIrOxxmWuKUPaYkPxv'],
          'kryminał': [
            '6QFu4m2jOIqjHO8lET1J', '6k243kM53SAMYHgMeyu6', '7JywpMTEj93SQfgFnAXj', 'CXxCw4w1pzGAAIi7MOck',
            'GvgzEXGoElZNZn8c5y2J', 'IyTldfMn4m0EHZV04p9O', 'Nxr7BWexah2pr68g9e6Q', 'iDdIrOxxmWuKUPaYkPxv'], 
          'science fiction': [
            '6QFu4m2jOIqjHO8lET1J', '6k243kM53SAMYHgMeyu6', '7JywpMTEj93SQfgFnAXj', 'CXxCw4w1pzGAAIi7MOck',
            'GvgzEXGoElZNZn8c5y2J', 'IyTldfMn4m0EHZV04p9O', 'Nxr7BWexah2pr68g9e6Q', 'iDdIrOxxmWuKUPaYkPxv'], 
          'literatura piękna': [
            '6QFu4m2jOIqjHO8lET1J', '6k243kM53SAMYHgMeyu6', '7JywpMTEj93SQfgFnAXj', 'CXxCw4w1pzGAAIi7MOck',
            'GvgzEXGoElZNZn8c5y2J', 'IyTldfMn4m0EHZV04p9O', 'Nxr7BWexah2pr68g9e6Q', 'iDdIrOxxmWuKUPaYkPxv'], 
          'romans': [
            '6QFu4m2jOIqjHO8lET1J', '6k243kM53SAMYHgMeyu6', '7JywpMTEj93SQfgFnAXj', 'CXxCw4w1pzGAAIi7MOck',
            'GvgzEXGoElZNZn8c5y2J', 'IyTldfMn4m0EHZV04p9O', 'Nxr7BWexah2pr68g9e6Q', 'iDdIrOxxmWuKUPaYkPxv'], 
          'horror': [
            '6QFu4m2jOIqjHO8lET1J', '6k243kM53SAMYHgMeyu6', '7JywpMTEj93SQfgFnAXj', 'CXxCw4w1pzGAAIi7MOck',
            'GvgzEXGoElZNZn8c5y2J', 'IyTldfMn4m0EHZV04p9O', 'Nxr7BWexah2pr68g9e6Q', 'iDdIrOxxmWuKUPaYkPxv'], 
          'popularnonaukowa': [
            '6QFu4m2jOIqjHO8lET1J', '6k243kM53SAMYHgMeyu6', '7JywpMTEj93SQfgFnAXj', 'CXxCw4w1pzGAAIi7MOck',
            'GvgzEXGoElZNZn8c5y2J', 'IyTldfMn4m0EHZV04p9O', 'Nxr7BWexah2pr68g9e6Q', 'iDdIrOxxmWuKUPaYkPxv'],  
          'literatura młodzieżowa': [
            '6QFu4m2jOIqjHO8lET1J', '6k243kM53SAMYHgMeyu6', '7JywpMTEj93SQfgFnAXj', 'CXxCw4w1pzGAAIi7MOck',
            'GvgzEXGoElZNZn8c5y2J', 'IyTldfMn4m0EHZV04p9O', 'Nxr7BWexah2pr68g9e6Q', 'iDdIrOxxmWuKUPaYkPxv'],
          'literatura faktu': [
              '6QFu4m2jOIqjHO8lET1J', '6k243kM53SAMYHgMeyu6', '7JywpMTEj93SQfgFnAXj', 'CXxCw4w1pzGAAIi7MOck',
              'GvgzEXGoElZNZn8c5y2J', 'IyTldfMn4m0EHZV04p9O', 'Nxr7BWexah2pr68g9e6Q', 'iDdIrOxxmWuKUPaYkPxv'],        
        })

    onMounted(() => {
        // ilosc obiektow do zapisania
        var genre = genresObj.value[props.genre]
        let nBooks = 6
        for (let i=0; i<nBooks; i++){
            // branie randomowego id z obiektu dla klucza fantasy
            // jak chcemy do innego to po prostu zamiast fantasy co innego
            let randomBookId = genre.sample()
            db.collection("books").doc(randomBookId).get().then((doc) => {
                var data = {
                    bookId : doc.id,
                    title : doc.data().title,
                    author : doc.data().author,
                    genre : doc.data().genre,
                    cover : doc.data().cover
                }
                genreBooks.value.push(data)
            })
            // upewnianie sie ze id sie nie powtarzaja
            genre.splice(genre.indexOf(randomBookId), 1)
         } 

         
    
    })

    // tworzenie metody sample dla obiektow typu array
    // losowe zwracanie elementu
    Array.prototype.sample = function() {
      return this[Math.floor(Math.random()*this.length)]
    }


</script>


<style scoped>

.card-author {
  font-size: 12px;
  margin: 0px 5px 8px 5px;
}

.card-footer {
  text-align: center;
}

.card-body {
  text-align: center;
}

.card-title {
  font-size: 15px;
	letter-spacing: 0.4px;
  margin: 8px;
  font-family: 'Ubuntu, Times New Roman';
	letter-spacing: 0.5px;
  font-weight: 600;
}
</style>