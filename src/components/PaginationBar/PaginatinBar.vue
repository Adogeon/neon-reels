<script setup lang="tsx">

const { currentPage, totalPages } = defineProps<{
    currentPage: number,
    totalPages: number
}>()

const visiblePages = computed(() => {
    const now = currentPage.value
    const pages: Array<number> = [now - 2, now - 1, now, now + 1, now + 2]
    return pages.filter(page => page > 0).filter(page => page <= totalPages)
})
const nextPage = () => {
    if (currentPage < totalPages) {
        currentPage++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};


</script>

<template>
    <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
            < </button>

                <button @click="() => { currentPage = 1 }" v-if="currentPage > 3 && totalPages > 5">1</button>
                <span v-if="currentPage > 3 && totalPages > 5">...</span>
                <button v-for="page in visiblePages" :key="`page-${page}`" @click="() => currentPage = page">
                    {{ page }}
                </button>
                <span v-if="currentPage < totalPages - 2 && totalPages > 5">...</span>
                <button @click="() => { currentPage = totalPages }"
                    v-if="currentPage < totalPages - 2 && totalPages > 5">{{
                        totalPages }}</button>
                <button @click="nextPage" :disabled="currentPage === totalPages">></button>
    </div>
</template>

<style lang="scss" scoped></style>