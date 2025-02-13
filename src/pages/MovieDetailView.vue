<script setup lang="ts">
import {ref, watch, watchEffect} from 'vue';
import {useRoute} from 'vue-router';
import { getMovieDetails, getMovieRecommendation } from '../api/movieService';
import MovieSimpleCard from "../components/MovieCards/MovieSimpleCard.vue";
import { MovieDetails, MovieSimple } from '../types/Movie';
import useApiRequest from '../composables/useApiRequest';

const movie = ref<MovieDetails | null>(null);
const recommends = ref<Array<MovieSimple>>([]);
const {data: detailData, loading: detailLoading, error, execute: getDetails} = useApiRequest(getMovieDetails);
const {data: recommendData, loading: recommendLoading, error: recError, execute: getRecommend} = useApiRequest(getMovieRecommendation);
const route = useRoute();

const fetchData = async (id: string) => {
    movie.value = null;
    error.value = null;
    getDetails(id);
    getRecommend(id);
}

watchEffect(async () => {
    fetchData(route.params.id as string);
})

watch(() => detailData.value, (newData) => {
    if(!newData || 'status_message' in newData) {
        error.value = `Error fetching movie: ${newData?.status_message}`;
    } else {
        movie.value = newData
    }
})

watch(() => recommendData.value, (newData) => {
  console.log(newData);
  if(!newData || 'status_message' in newData) {
    error.value = `Error get movie recommendation: ${newData?.status_message}`;
  } else {
    recommends.value = newData.results;
  }
} )

</script>

<template>
    <section v-if="detailLoading">
        <h1>Loading ...</h1>
    </section>
    <section v-else-if="!movie">
        <h1>Something is horribly wrong, there is no movie!!!</h1>
    </section>
    <section v-else class="movie-detail">
        <h1>{{ movie.title }}</h1>
       <!-- Movie Header (Poster + Quick Details) -->
        <section class="movie-header">
            <div class="poster">
                <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="Movie Poster"/>
            </div>
            <div class="movie-info">
                <div class="tagline">{{ movie.tagline }}</div>
                <div class="genres">
                    <strong>Genres: </strong> 
                    {{ movie.genres.map(g => g.name).join(', ') }}
                </div>
                <div class="release-date"><strong>Release Date:</strong> {{ movie.release_date }}</div>
                <div class="rating"><strong>Rating:</strong> ⭐ {{ movie.vote_average }}/10 ({{ movie.vote_count }} votes)</div>
                <div class="runtime"><strong>Runtime:</strong> {{ movie.runtime }} min</div>
                <div v-if="movie.homepage">
                    <a :href="movie.homepage" target="_blank">Official Site</a>
                </div>
            </div>
        </section>
        <section class="plot-summary">
            <h2>Summary</h2>
            <p>{{ movie.overview }}</p>
        </section>
        <section class="recommendations" v-if="recommends.length > 0">
          <h2>Similar Movies</h2>
          <section class="recommendation-grid">
            <MovieSimpleCard v-for="movie in recommends" :data="movie" :key="movie.id"/>
          </section>
        </section>
    </section>
</template>

<style lang="scss" scoped>
.movie-detail {
  width: min(90vw, 1200px);
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.movie-header {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-evenly;

  .poster {
    flex-shrink: 0;
    img {
      width: 300px;
      height: 100%;
    }
  }

  .movie-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}

.plot-summary {
  background: rgba(50, 50, 50, 0.8);
  padding: 1rem;
  border-radius: 10px;
}

.expandable-details {
  cursor: pointer;
  background: #222;
  padding: 1rem;
  border-radius: 10px;
  transition: background 0.3s;

  &:hover {
    background: #333;
  }
}

.credits {
  h2 {
    margin-bottom: 0.5rem;
  }
  ul {
    padding-left: 1.5rem;
  }
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

