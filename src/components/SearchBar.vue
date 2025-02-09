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

<style lang="scss" module>
@use 'sass:color';
@use "../styles/variables" as colors;
form {
  display: flex;
  justify-content:center;
  flex-flow: column;
  align-items: center;
  gap: 1rem;
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

input:focus{
  border-color:colors.$primary-color
}

button {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 2rem;  // Rounded corners
  background-color: colors.$primary-color;
  color: colors.$text-color;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  text-transform: uppercase;
  
  &:hover {
    background-color: color.adjust(colors.$primary-color, $lightness: -10%);
    transform: scale(1.05); 
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px color.adjust(colors.$primary-color, $lightness: 20%);
  }

  &:active {
    background-color: color.adjust(colors.$primary-color, $lightness: 10%);
  }
}

</style>
