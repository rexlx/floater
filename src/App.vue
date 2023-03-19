
<template>
  <div>
    <NavBar />

  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</div>
</template>


<script setup>

import NavBar from './components/NavBar.vue';
import { useFirestore } from "@/stores/authStore.js";
import { onMounted } from 'vue';

const storeAuth = useFirestore()
onMounted(() => {
  storeAuth.init()
})
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>