<script setup lang="ts">
import {ref} from 'vue';

import SearchBar from '../components/SearchBar.vue';
import MovieSimpleCard from '../components/MovieCards/MovieSimpleCard.vue';
import {searchMovie} from '../api/movieService';
import { MovieSimple } from '../types/Movie';

const movies = ref<Array<MovieSimple>>([]);

const handleSubmit = async (subject: string) => {
    const result = await searchMovie(subject);
    
    if(!result || 'status_message' in result) {
        console.error("error fetching movies:", result?.status_message);
        return;
    }

    movies.value = result.results;
}
</script>

<template>
    <SearchBar @submit="handleSubmit"/>
    <section id="result-area">
        <div :class="$style.resultGrid">
           <MovieSimpleCard v-for="movie in movies" :data="movie" :key="`movie-${movie.id}`"/>
        </div>
    </section>
</template>

<style lang="css" module>
.resultGrid {
    display: flex;
    flex-wrap: wrap;
}
</style>