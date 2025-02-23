<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import useApiRequest from '../composables/useApiRequest';
import { searchMovie } from '../api/movieService';
import { type MovieSimple } from '../types/Movie';

import SearchBar from '../components/SearchBar.vue';
import SimpleCard from '../components/SimpleCard/SimpleCard.vue';

const route = useRoute();
const movies = ref<Array<MovieSimple>>([]);
const currentPage = ref(1);
const { data: result, loading, error, execute } = useApiRequest(searchMovie)

watchEffect(async () => {
  await execute(route.query.s as string, currentPage.value);
  if (!result.value || 'status_message' in result.value) {
    error.value = `error fetching movies:", ${result.value?.status_message}`;
    return;
  }
  movies.value = result.value.results;
}
)

const selectMovie = ref<MovieSimple | null>(null);
const toggleMovieDetails = (movie: MovieSimple) => {
  selectMovie.value = movie;
}

const totalPages = computed(() => result.value?.total_pages || 0);

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

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
    <div v-if="selectMovie" class="select-movie">
      <p>{{ selectMovie.overview }}</p>
      <p><strong>Release Date:</strong>{{ selectMovie.release_date }}</p>
      <div>
        <RouterLink :to="`/details/${selectMovie.id}`">Further Details ...</RouterLink>
      </div>
      <button @click.stop="selectMovie = null">Close</button>
    </div>
    <div class="result-grid">
      <SimpleCard v-for="movie in movies" :poster="movie.poster_path" :title="movie.title" :key="`movie-${movie.id}`"
        @click="toggleMovieDetails(movie)" />
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
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