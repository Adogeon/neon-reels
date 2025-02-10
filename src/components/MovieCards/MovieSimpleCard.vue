<script setup lang="tsx">
import {ref} from 'vue';
import {RouterLink} from 'vue-router';
import { type MovieSimple } from '../../types/Movie';
const {data} = defineProps<{
    data: MovieSimple
}>()

const showDetail = ref<Boolean>(false);
 
const toggleDetail = () => {
    showDetail.value = !showDetail.value;
}

</script>

<template>
    <div @click="toggleDetail" class="movie-card" :class="{expanded: showDetail}">
        <img class="movie-poster" :src="`https://image.tmdb.org/t/p/w300/${data.poster_path}`"/>
        <div class="movie-title">{{ data.title }}</div>
        <div v-if="showDetail" class="movie-details" :class="showDetail ? `show` : ``">
            <p>{{ data.overview }}</p>
            <p><strong>Release Date:</strong>{{ data.release_date }}</p>
            <div><RouterLink :to="`/details/${data.id}`">Further Details ...</RouterLink></div>
            <button @click.stop="toggleDetail"></button>
        </div>
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
  padding: 1rem;
  position: relative;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-card.expanded {
    height: auto;
    z-index: 10;
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

.movie-details{
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 5;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: themes.$card-background;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
</style>