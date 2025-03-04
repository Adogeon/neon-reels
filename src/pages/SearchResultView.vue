<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import useApiRequest from '../composables/useApiRequest';
import { getNowPlaying, getPopular, getUpcomingMovie, searchMovie } from '../api/movieService';
import { type MovieSimple } from '../types/Movie';

import SearchBar from '../components/SearchBar.vue';
import SimpleCard from '../components/SimpleCard/SimpleCard.vue';
import PaginationBar from '../components/PaginationBar/PaginationBar.vue';

const router = useRouter();
const route = useRoute();
const movies = ref<Array<MovieSimple>>([]);
const apiRequest = () => {
  if ("t" in route.query) {
    switch (route.query.t) {
      case 'popular':
        return getPopular;
      case 'upcoming':
        return getUpcomingMovie;
      default:
        return getNowPlaying;
    }
  } else {
    return searchMovie
  }
}

const { data: result, loading, error, execute } = useApiRequest(apiRequest())

const currentPage = ref<number>(1);
watchEffect(async () => {
  currentPage.value = route.query.page !== undefined ? parseInt(route.query?.page as string) : 1;
  if ('t' in route.query) {
    await execute(currentPage.value)
  } else {
    await execute(route.query.s as string, currentPage.value);
  }
  if (!result.value || 'status_message' in result.value) {
    error.value = `error fetching movies:", ${result.value?.status_message}`;
    return;
  }
  movies.value = result.value.results;
}
)

const totalPages = computed(() => {
  return result.value?.total_pages || 1
})

</script>

<template>
  <SearchBar @submit="" />
  <section v-if="loading">
    <h1> Loading ...</h1>
  </section>
  <section v-else-if="error">
    <h1>Something is horribly wrongs! Please try again</h1>
  </section>
  <section v-else id="result-area">
    <div class="result-grid">
      <SimpleCard v-for="movie in movies" :poster="movie.poster_path" :title="movie.title" :key="`movie-${movie.id}`"
        @click="router.push({ path: `/details/${movie.id}` })" />
    </div>
    <PaginationBar :current-page="currentPage" :total-pages="totalPages"
      @go-to-page="(page) => { router.push({ path: '/search', query: { ...route.query, page: page } }) }" />
  </section>
</template>

<style lang="scss" scoped>
#result-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(90vw, 1200px);
  margin: 9 auto;
  padding: 1rem;
  min-height: 100vh;
}

.selected-movie {
  background: #1a1a2e;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  min-height: 200px;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  width: 100%;
  gap: 1rem;
  position: relative;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .selected-movie {
    padding: 1rem;
    font-size: 0.9rem;
    width: 90%;
  }

  .result-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.5rem;
  }
}
</style>