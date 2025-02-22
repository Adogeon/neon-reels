<script lang="tsx" setup>
const data = defineProps<{
    poster: string,
    title: string
}>()

</script>

<template>
    <div class="card">
        <img class="poster" :src="`https://image.tmdb.org/t/p/w300/${data.poster}`" />
        <div class="title">{{ data.title }}</div>
    </div>
</template>

<style lang="scss" scoped>
@use "../../styles/variables" as themes;

.card {
    background-color: themes.$card-background;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    cursor: pointer;
}

.hover {
    transform: translateY(-5px);
}

.poster {
    width: 100%;
    height: auto;
}

.title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.5rem;
}
</style>