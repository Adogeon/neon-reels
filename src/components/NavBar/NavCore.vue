<script setup lang="tsx">
import SearchBar from '../SearchBar.vue';
</script>

<template>
    <nav class="navbar">
        <div class="nav-container">
            <router-link to="/" class="logo">Neon Reels</router-link>

            <ul class="nav-links">
                <li><router-link to="/popular">Popular</router-link></li>
                <li><router-link to="/now-playing">Now Playing</router-link></li>
                <li><router-link to="/upcoming">Upcoming</router-link></li>
            </ul>

            <SearchBar />
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    padding: 0.75rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1200px;
    }

    .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: #ff00ff;
        text-decoration: none;
    }

    .nav-links {
        list-style: none;
        display: flex;
        gap: 1.5rem;

        li a {
            color: white;
            text-decoration: none;
            font-size: 1rem;
            transition: color 0.2s ease-in-out;

            &:hover {
                color: #ff00ff;
            }
        }
    }
}
</style>