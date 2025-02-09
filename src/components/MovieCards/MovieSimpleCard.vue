<script setup lang="tsx">
import {ref} from 'vue';
import {RouterLink} from 'vue-router';
import { type MovieSimple } from '../../types/Movie';
const {data} = defineProps<{
    data: MovieSimple
}>()

const showDetail = ref<Boolean>(false);
 
const toggleDetail = () => {
    showDetail.value = !showDetail.value;
}

</script>

<template>
    <div @click="toggleDetail">
        <div class="info">
            <img :src="`https://image.tmdb.org/t/p/w300/${data.poster_path}`"/>
            <div><span id="title-text">{{ data.title }}</span></div>
            <div>{{ data.popularity }}</div>
        </div>
        <div class="expandable" :class="showDetail ? `show` : ``">
            <div>{{ data.overview }}</div>
            <div>{{ data.vote_average }}</div>
            <div>{{ data.vote_count }}</div>
            <div><RouterLink :to="`/details/${data.id}`">Further Details ...</RouterLink></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info {
    width: 100%;
    max-width: 300px;
    text-wrap: balance;
}

#title-text {
    text-wrap: balance;
}

.expandable {
    display: none;
}

.expandable.show{
    display: flex;
    width: 100%;
    flex-direction: column;
}
</style>