<script setup lang="tsx">
import {ref} from 'vue';
import { type MovieSimple } from '../../types/Movie';
const {data} = defineProps<{
    data: MovieSimple
}>()

</script>

<template>
    <div class="movie-card" >
        <img class="movie-poster" :src="`https://image.tmdb.org/t/p/w300/${data.poster_path}`"/>
        <div class="movie-title">{{ data.title }}</div>
    </div>
</template>

<style lang="scss" scoped>
@use "../../styles/variables" as themes;

.movie-card {
  background-color: themes.$card-background;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-poster {
  width: 100%;
  height: auto;
}

.movie-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem;
}

.movie-description {
  font-size: 0.9rem;
  margin: 0.5rem;
}

</style>