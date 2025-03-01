<script setup lang="ts">
import { computed } from 'vue';

const { currentPage, totalPages } = defineProps<{
    currentPage: number,
    totalPages: number
}>()

const emit = defineEmits<{
    goToPage: [page: number]
}>()

const visiblePages = computed(() => {
    const pages: Array<number> = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
    return pages.filter(page => page > 0).filter(page => page <= totalPages)
})

const handlePageChange = (page: number) => {
    emit('goToPage', page);
}

</script>

<template>
    <div class="pagination">
        <button @click="handlePageChange(1)" v-if="currentPage > 3 && totalPages > 5">First(1)</button>
        <span v-if="currentPage > 3 && totalPages > 5">...</span>
        <button v-for="page in visiblePages" :key="`page-${page}`" @click="handlePageChange(page)"
            :class="{ active: page === currentPage }">
            {{ page }}
        </button>
        <span v-if="currentPage < totalPages - 2 && totalPages > 5">...</span>
        <button @click="handlePageChange(totalPages)" v-if="currentPage < totalPages - 2 && totalPages > 5">Last({{
            totalPages }})</button>
    </div>
</template>

<style lang="scss" scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    font-size: 1rem;

    button {
        background: transparent;
        border: 1px solid #ff00ff; // Neon Violet
        color: #ff00ff;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
            background: #ff00ff;
            color: black;
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .active {
        background: #ff00ff;
        color: black;
        font-weight: bold;
    }

    span {
        color: #aaa;
        font-weight: bold;
        padding: 0 0.5rem;
    }

    @media (max-width: 600px) {
        font-size: 0.9rem;

        button {
            padding: 0.3rem 0.7rem;
        }
    }
}
</style>