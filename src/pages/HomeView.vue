<script setup lang="ts">

import SearchBar from '../components/SearchBar.vue';

</script>

<template>
  <div class="home-container">
    <h1>Neon Reels</h1>
    <SearchBar />
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.title {
  font-size: 4rem;
  font-weight: bold;
  color: var(--neon-primary);
  text-shadow: 0 0 10px var(--neon-primary), 0 0 20px var(--neon-secondary);
  margin-bottom: 1.5rem;
}

</style>