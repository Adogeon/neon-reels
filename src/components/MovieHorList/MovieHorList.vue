<script setup lang="ts">
import { useRouter } from 'vue-router'
import { type MovieSimple } from '../../types/Movie';
import SimpleCard from '../SimpleCard/SimpleCard.vue';

const { title, movies } = defineProps<{
    title: string
    movies: Array<MovieSimple>
}>()

const router = useRouter();

</script>

<template>
    <section class="hor-list-container">
        <h2>{{ title }}</h2>
        <section class="movie-hor-list">
            <SimpleCard v-for="movie in movies" :poster="movie.poster_path" :title="movie.title" :key="movie.id"
                @click="router.push({ path: `/details/${movie.id}` })" />
        </section>
    </section>
</template>

<style lang="scss" scoped>
.hor-list-container {
    width: 100%;

    .movie-hor-list {
        display: flex;
        gap: 1rem;
        overflow-x: auto;
        white-space: nowrap;

        .card {
            min-width: 200px;
        }
    }
}
</style>