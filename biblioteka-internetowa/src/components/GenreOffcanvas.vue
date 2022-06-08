<template>
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title title" id="offcanvasExampleLabel">Kategorie</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div><hr>
    <div class="offcanvas-body">
        <ul class="canvasLinks list-group list-group-flush" v-for="category of categoriesAll" :key="category">
          <a class="list-group-item list-group-item-action" @click="handleOffcanvas(category)">{{category.charAt(0).toUpperCase() + category.slice(1)}}</a>  
        </ul>
    </div>
</div>    

</template>

<script setup>
  import { ref } from 'vue'
  const categoriesAll = ref(['fantasy', 'kryminał', 'science fiction', 'literatura piękna', 'romans', 'horror', 'popularnonaukowa', 'literatura młodzieżowa', 'literatura faktu', 'powieść historyczna', 'klasyka', 'thriller', 'sensacja', 'literatura dziecięca', 'dramat'])
  // ['fantasy', 'kryminał', 'science fiction', 'literatura piękna', 'romans', 'horror', 'popularnonaukowa', 'literatura młodzieżowa', 'literatura faktu', 'powieść historyczna', 'klasyka', 'thriller', 'sensacja', 'literatura dziecięca', 'dramat']
  
  function handleOffcanvas(category){
      window.location.replace('/search/' + category)
      
  }

  
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
.canvasLinks a{
    text-decoration: none;
    color: #006600;
    cursor: pointer;
    font-family: 'Raleway', sans-serif;
}

.title {
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 1.2px;
  text-align: center;
  margin-top: 15px;
  color: #106e07;
}

</style>