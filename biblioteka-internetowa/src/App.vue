<template>
  <h1>{{ title }}</h1>
  <Test/>

</template>

<script>
  import Test from './components/Test.vue'
  
  export default {
    components: { Test },
    data() {
      return {
        title: "Test książek"
      }
    }
  }
</script>
