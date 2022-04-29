<template>
  <Navbar/>
  <div id="mainDiv">
    <h1>{{ title }}</h1>
    <Test/>
  </div>
  

</template>

<script>
  import Test from './components/Test.vue'
  import Navbar from './components/Navbar.vue'
  
  export default {
    components: { Test, Navbar },
    data() {
      return {
        title: "Test książek"
      }
    }
  }
</script>
