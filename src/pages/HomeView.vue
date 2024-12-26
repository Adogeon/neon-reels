<script setup lang="ts">
import SearchBar from '../components/SearchBar.vue';

const handleSubmit = (subject: string) => {
    console.log(subject);
}

</script>

<template>
    <SearchBar @submit="handleSubmit"/>
    <section id="result-area"></section>
</template>