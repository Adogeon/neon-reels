<script setup lang="ts">

import SearchBar from '../components/SearchBar.vue';
import { getPopular, getNowPlaying, getUpComingMovie } from '../api/movieService';
import useApiRequest from '../composables/useApiRequest';
import { computed, watchEffect } from 'vue';
import { MovieSimple } from '../types/Movie';
import MovieSimpleCard from '../components/MovieCards/MovieSimpleCard.vue';

const {data: popularResult, error: popularError, loading: popularLoading, execute: fetchPopular} = useApiRequest(getPopular);
const {data: nowPlayingResult, error: nowPlayingError, loading: nowPlayingLoading, execute: fetchNowPlaying} = useApiRequest(getNowPlaying);
const {data: upComingResult, error: upComingError, loading: upComingLoading, execute: fetchUpComing} = useApiRequest(getUpComingMovie);

watchEffect(async () => {
  await fetchPopular();
  await fetchNowPlaying();
  await fetchUpComing();
})

const popularMovies = computed<Array<MovieSimple>>(() => popularResult.value?.results || []);
const nowPlayingMovies = computed<Array<MovieSimple>>(() => nowPlayingResult.value?.results || []);
const upComingMovies = computed<Array<MovieSimple>>(() => upComingResult.value?.results || []);
</script>

<template>
  <div class="home-container">
    <h1>Neon Reels</h1>
    <SearchBar />
     <section class="recommendations" v-if="popularMovies.length > 0">
          <h2>Popular</h2>
          <section class="recommendation-grid">
            <MovieSimpleCard v-for="movie in popularMovies" :data="movie" :key="movie.id"/>
          </section>
        </section>
         <section class="recommendations" v-if="nowPlayingMovies.length > 0">
          <h2>Now Playing</h2>
          <section class="recommendation-grid">
            <MovieSimpleCard v-for="movie in nowPlayingMovies" :data="movie" :key="movie.id"/>
          </section>
        </section>
         <section class="recommendations" v-if="upComingMovies.length > 0">
          <h2>Up Coming</h2>
          <section class="recommendation-grid">
            <MovieSimpleCard v-for="movie in upComingMovies" :data="movie" :key="movie.id"/>
          </section>
        </section>
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

.recommendation-grid {
  width: 100%;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  white-space: nowrap;
  
  .movie-card {
    min-width: 200px;
  }
}

</style>