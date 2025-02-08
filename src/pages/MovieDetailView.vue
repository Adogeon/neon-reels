<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import {useRoute} from 'vue-router';
import { getMovieDetails } from '../api/movieService';
import { MovieDetails } from '../types/Movie';

const movie = ref<MovieDetails| null>(null);
const loading = ref<boolean>(false)

const route = useRoute();

const fetchData = async (id: string) => {
    movie.value = null;
    loading.value = true;
    
    try {
        const result = await getMovieDetails(id)
        if(!result || 'status_message' in result) {
            console.log("error fetching movies:", result?.status_message);
            return;
        }
        movie.value = result;
       
    } catch (err) {
        console.log(err)
    } 
    finally {
        loading.value = false;
    }
}

watchEffect(async () => {
    await fetchData(route.params.id as string)
    console.log(movie.value)
})

</script>

<template>
    <section v-if="loading === true">
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

