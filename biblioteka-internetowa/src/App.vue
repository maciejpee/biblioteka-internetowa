<template>
  <Navbar/>
  <router-view></router-view>

</template>

<script>
  import Books from './components/Books.vue'
  import Navbar from './components/Navbar.vue'
  
  export default {
    components: { Books, Navbar, },
    data() {
      return {
        url: location.href
      }
    }
  }
</script>
 
<style>

html {
    height: 100%;
    font-size: 100%;
}
body {
    background: #f5f5d6;
    height: 100%;
}

.mainDiv {
  background-color: #faffff;
  height: 80%;
  margin-left: 9%;
  margin-right: 9%;
  margin-top: 4%;
  margin-bottom:0px;
  padding: 25px 25px 25px 25px;
  
}
</style>