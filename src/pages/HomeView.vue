<script setup lang="ts">
import {ref} from 'vue';

import SearchBar from '../components/SearchBar.vue';
import MovieSimpleCard from '../components/MovieCards/MovieSimpleCard.vue';
import {searchMovie} from '../api/movieService';
import { MovieSimple } from '../types/Movie';
import useApiRequest from '../composables/useApiRequest';

const movies = ref<Array<MovieSimple>>([]);

const {data:result, loading, error, execute} = useApiRequest(searchMovie)

const handleSubmit = async (subject: string) => {
    await execute(subject);
    
    if(!result.value || 'status_message' in result.value) {
        error.value = `error fetching movies:", ${result.value?.status_message}`;
        return;
    }

    movies.value = result.value.results;
}
</script>

<template>
    <SearchBar @submit="handleSubmit"/>
    <section v-if="loading">
        <h1> Loading ...</h1>
    </section>
    <section v-else-if="error">
        <h1>Something is horribly wrongs! Please try again</h1>
    </section>
    <section v-else id="result-area">
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