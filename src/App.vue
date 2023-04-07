<script setup>
import { RouterView, RouterLink } from "vue-router"
import { ref } from "vue"

const counter = ref(0)
</script>
<template>
  <main>
    <div class="links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
    <RouterView />
  </main>
</template>

<style scoped>
.links {
  padding: 20px;
}

.links a {
  margin-left: 20px;
}
</style>