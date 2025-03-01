/* eslint-disable @typescript-eslint/no-unused-vars */
<script setup lang="ts">

import { getPopular, getNowPlaying, getUpcomingMovie } from '../api/movieService';
import useApiRequest from '../composables/useApiRequest';
import { computed, watchEffect } from 'vue';
import { MovieSimple } from '../types/Movie';
import MovieHorList from '../components/MovieHorList/MovieHorList.vue';
import NavBar from "../components/NavBar/NavCore.vue";

const { data: popularResult, error: popularError, loading: popularLoading, execute: fetchPopular } = useApiRequest(getPopular);
const { data: nowPlayingResult, error: nowPlayingError, loading: nowPlayingLoading, execute: fetchNowPlaying } = useApiRequest(getNowPlaying);
const { data: upcomingResult, error: upcomingError, loading: upcomingLoading, execute: fetchUpcoming } = useApiRequest(getUpcomingMovie);

watchEffect(async () => {
  await fetchPopular();
  await fetchNowPlaying();
  await fetchUpcoming();
})

const popularMovies = computed<Array<MovieSimple>>(() => popularResult.value?.results || []);
const nowPlayingMovies = computed<Array<MovieSimple>>(() => nowPlayingResult.value?.results || []);
const upcomingMovies = computed<Array<MovieSimple>>(() => upcomingResult.value?.results || []);
</script>

<template>
  <NavBar />
  <div class="home-container">
    <h1>Neon Reels</h1>
    <SearchBar />
    <MovieHorList v-if="popularMovies.length > 0" title="Popular" :movies="popularMovies" />
    <MovieHorList v-if="nowPlayingMovies.length > 0" title="Now Playing" :movies="nowPlayingMovies" />
    <MovieHorList v-if="upcomingMovies.length > 0" title="Upcoming" :movies="upcomingMovies" />
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(90vw, 1200px);
  text-align: center;
  padding: 2rem;
}

.title {
  font-size: 4rem;
  font-weight: bold;
  color: var(--neon-primary);
  text-shadow: 0 0 10px var(--neon-primary), 0 0 20px var(--neon-secondary);
  margin-bottom: 1.5rem;
}

.recommendations {
  width: 100%;

  .recommendation-grid {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    white-space: nowrap;

    .movie-card {
      min-width: 200px;
    }
  }
}
</style>