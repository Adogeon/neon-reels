<script setup lang="tsx">
import { type MovieSimple } from '../../types/Movie';

const { title, movies } = defineProps<{
    title: string
    movies: Array<MovieSimple>
}>()

</script>

<template>
    <section class="hor-list-container">
        <h2>{{ title }}</h2>
        <section class="movie-hor-list">
            <MovieSimpleCard v-for="movie in movies" :data="movie" :key="movie.id" />
        </section>
    </section>
</template>

<style lang="scss" scoped>
.hor-list.container {
    width: 100%;

    .movie-hor-list {
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