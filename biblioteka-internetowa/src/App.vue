<template>
  <h1>{{ title }}</h1>
  <Books/>

</template>

<script>
  import Books from './components/Books.vue'
  export default {
    components: { Books },
    data() {
      return {
        title: "Test książek"
      }
    }
  }
</script>
