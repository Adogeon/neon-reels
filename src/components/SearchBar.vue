<script setup lang="ts">
const searchTerm = defineModel<string>({ default: "" });
defineEmits({
  submit: (subject: string) => subject !== undefined,
});
</script>

<template>
  <form @submit.prevent="$emit('submit', searchTerm)">
    <input type="text" placeholder="movie-query" v-model.trim="searchTerm" />
    <button type="submit">Search</button>
  </form>
</template>
