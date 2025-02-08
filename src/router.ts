import { type RouteRecordRaw, createWebHistory, createRouter } from "vue-router";
import HomeView from "./pages/HomeView.vue"
import MovieDetailView from "./pages/MovieDetailView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/details/:id',
        component: MovieDetailView,
    },
    { path: '/', component: HomeView }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;