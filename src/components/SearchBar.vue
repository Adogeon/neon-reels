<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const searchTerm = defineModel<string>({ default: "" });

const handleSubmit = () => {
  if (searchTerm.value.trim()) {
    router.replace({ path: '/search', query: { s: searchTerm.value } })
  }
}

</script>

<template>
  <form @submit.prevent="handleSubmit" class="search-bar">
    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11.5" cy="11" r="8"></circle>
      <line x1="1" y1="23" x2="7" y2="16"></line>
    </svg>
    <input type="text" placeholder="Search movies..." v-model.trim="searchTerm" />
  </form>
</template>


<style lang="scss" scoped>
@use 'sass:color';
@use "../styles/variables" as colors;

form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: min(100%, 300px);

  .search-icon {
    transform: translateX(50%);
    height: 2rem;
    color: #888;
  }
}


input {
  padding: 0.8rem;
  width: 18.75rem;
  border-radius: 1.875rem;
  border: 0.125rem solid colors.$text-color;
  font-size: 1rem;
  color: colors.$text-color;
  background-color: colors.$card-background;
  outline: none;
}

input:focus {
  border-color: colors.$primary-color
}
</style>
