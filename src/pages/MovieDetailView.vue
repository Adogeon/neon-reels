<script setup lang="ts">
import {ref, watch, watchEffect} from 'vue';
import {useRoute} from 'vue-router';
import { getMovieDetails } from '../api/movieService';
import { MovieDetails } from '../types/Movie';
import useApiRequest from '../composables/useApiRequest';

const movie = ref<MovieDetails | null>(null)
const {data, loading, error, execute} = useApiRequest(getMovieDetails);
const route = useRoute();

const fetchData = async (id: string) => {
    movie.value = null;
    error.value = null;
    execute(id);
}

watchEffect(async () => {
    await fetchData(route.params.id as string);
})

watch(() => data.value, (newData) => {
    if(!newData || 'status_message' in newData) {
        error.value = `Error fetching movie: ${newData?.status_message}`;
    } else {
        movie.value = newData
    }
})

</script>

<template>
    <section v-if="loading">
        <h1>Loading ...</h1>
    </section>
    <section v-else-if="!movie">
        <h1>Something is horribly wrong, there is no movie!!!</h1>
    </section>
    <section v-else>
        <h1>{{ movie.title }}</h1>
        <section>
            <div><img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"/></div>
            <div>
                <div>{{ movie.tagline }}</div>
                <div>Summary:
                    {{ movie.overview }}
                </div>
            </div>
        </section>
        <section>
            Plot summary and expandable list of smaller details
        </section>
        <section>
            Credits
        </section>
        <section>
            Recommendation area
        </section>
    </section>
</template>

