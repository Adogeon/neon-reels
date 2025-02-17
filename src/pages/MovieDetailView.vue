<script setup lang="ts">
import {ref, watch, watchEffect} from 'vue';
import {useRoute} from 'vue-router';

import { getMovieDetails } from '../api/movieService';

import { type MovieDetails, type MovieSimple } from '../types/Movie';
import { type Credits } from '../types/People';

import MovieSimpleCard from "../components/MovieCards/MovieSimpleCard.vue";
import useApiRequest from '../composables/useApiRequest';


const movie = ref<MovieDetails | null>(null);
const recommends = ref<Array<MovieSimple>>([]);
const people = ref<Credits | null>(null);
const {data: detailData, loading: detailLoading, error, execute: getDetails} = useApiRequest(getMovieDetails);
const route = useRoute();

const fetchData = async (id: string) => {
    movie.value = null;
    error.value = null;
    getDetails(id);
}

watchEffect(async () => {
    fetchData(route.params.id as string);
})

watch(() => detailData.value, (newData) => {
    if(!newData || 'status_message' in newData) {
        error.value = `Error fetching movie: ${newData?.status_message}`;
    } else {
        const {recommendations, credits, ...rest} = newData;
        movie.value = rest;
        recommends.value = recommendations.results;
        people.value = credits;
    }
})

</script>

<template>
    <section v-if="detailLoading">
        <h1>Loading ...</h1>
    </section>
    <section v-else-if="!movie">
        <h1>Something is horribly wrong, there is no movie!!!</h1>
    </section>
    <section v-else class="movie-detail">
      <!-- Movie Header (Poster + Quick Details) -->
      <section class="movie-header">
        <div class="poster">
          <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="Movie Poster"/>
        </div>
        <div class="movie-info">
                <h1>{{ movie.title }}</h1>
                <section class="movie-meta">
                  <span class="release-date">{{ movie.release_date }}</span> |
                  <span class="runtime">{{ movie.runtime }} min</span> |
                  <span class="genres"> 
                    {{ movie.genres.map(g => g.name).join(', ') }}
                  </span>
                </section>
                <div class="rating"><strong>Rating:</strong> ⭐ {{ movie.vote_average }}/10 ({{ movie.vote_count }} votes)</div>
                
                <section class="plot-summary">
                    <div class="tagline">{{ movie.tagline }}</div>
                    <h2>Summary</h2>
                    <p>{{ movie.overview }}</p>
                </section>
                <div v-if="movie.homepage">
                    <a :href="movie.homepage" target="_blank">Official Site</a>
                </div>
            </div>
        </section>
        <section class="movie-cast" v-if="people && people?.cast.length > 0">
          <h2>Cast</h2>
          <div class="cast-list">
            <div class="cast-member" v-for="member in people.cast" :key="member.id">
              <img 
                :src="member.profile_path ? `https://image.tmdb.org/t/p/w185/${member.profile_path}` : 'https://placehold.co/185x278?text=No Image&font=roboto'" 
                :alt="member.name"
              />
              <p class="actor-name">{{ member.name }}</p>
              <p class="character-name">as {{ member.character }}</p>
            </div>
          </div>
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
  align-items: flex-start;
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

    .movie-meta {
      font-size: 0.9rem;
      color: #bbb;
      margin-bottom: 1rem;

      span {
        display: inline-block;
        margin: 0 5px;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    .poster {
      width: 80%;
    }

    .movie-info {
      width: 100%;
      text-align: center;
    }
  }
}

.plot-summary {
  background: rgba(50, 50, 50, 0.8);
  padding: 1rem;
  border-radius: 10px;
  text-align: left;
  
  .tagline {
    text-align: center;
  }
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

.movie-cast {
  margin-top: 2rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .cast-list {
    display: flex;
    overflow-x: auto; // Enables horizontal scrolling
    gap: 1rem;
    padding-bottom: 1rem; // Space for scrollbar if needed
    scrollbar-width: thin; // For Firefox
    scrollbar-color: rgba(255, 255, 255, 0.5) transparent; 

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 4px;
    }
  }

  .cast-member {
    flex: 0 0 120px; // Controls the width of each cast card
    text-align: center;

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      object-fit: cover;
    }

    .actor-name {
      font-weight: bold;
      margin-top: 0.5rem;
    }

    .character-name {
      font-size: 0.9rem;
      opacity: 0.8;
    }
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

