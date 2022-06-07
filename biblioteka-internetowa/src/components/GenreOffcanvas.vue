<template>
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Kategorie</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <ul class="canvasLinks list-group list-group-flush" v-for="category of categoriesAll" :key="category">
          <li class="list-group-item" @click="handleOffcanvas(category)">{{category.charAt(0).toUpperCase() + category.slice(1)}}</li>  
        </ul>
    <!--<div class="canvasLinks" v-for="category of categoriesAll" :key="category">
          <a @click="handleOffcanvas(category)">{{category.charAt(0).toUpperCase() + category.slice(1)}}</a>  
        </div>--> 
    </div>
</div>    

</template>

<script setup>
  import { ref } from 'vue'
  const categoriesAll = ref(['fantasy', 'kryminał', 'science fiction', 'literatura piękna', 'romans', 'horror', 'popularnonaukowa', 'literatura młodzieżowa', 'literatura faktu', 'powieść historyczna', 'klasyka', 'thriller', 'sensacja', 'literatura dziecięca', 'dramat'])
  // ['fantasy', 'kryminał', 'science fiction', 'literatura piękna', 'romans', 'horror', 'popularnonaukowa', 'literatura młodzieżowa', 'literatura faktu', 'powieść historyczna', 'klasyka', 'thriller', 'sensacja', 'literatura dziecięca', 'dramat']
  
  function handleOffcanvas(category){
      window.location.replace('/search/' + category.replace(/ +/g, '-'))
      
  }

  
</script>



<style scoped>

.canvasLinks a{
    text-decoration: none;
    color: green;
    cursor: pointer;

}

</style>