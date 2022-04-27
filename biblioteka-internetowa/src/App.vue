<template>
  <h1>{{ message }}</h1>
</template>

<script setup>
  import { ref } from 'vue'
  const message = ref('Hello Vue!')
</script>
