<template>
<<<<<<< HEAD
  <h1>{{ title }}</h1>
  <Books/>
=======
  <Navbar/>
  <div id="mainDiv">
    <h1>{{ title }}</h1>
    <Test/>
  </div>
  
>>>>>>> 8a6ce8539c6b51d5592bf209077c7b1b7bb7c1ad

</template>

<script>
<<<<<<< HEAD
  import Books from './components/Books.vue'
  export default {
    components: { Books },
=======
  import Test from './components/Test.vue'
  import Navbar from './components/Navbar.vue'
  
  export default {
    components: { Test, Navbar },
>>>>>>> 8a6ce8539c6b51d5592bf209077c7b1b7bb7c1ad
    data() {
      return {
        title: "Test książek"
      }
    }
  }
</script>
