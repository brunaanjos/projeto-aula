<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import genreStore from '@/stores/genre'


const isLoading = ref(false)
const tv = ref([]);
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const listtv = async (genreId) => {
  isLoading.value = true;
    const response = await api.get('discover/tv', {
        params: {
            with_genres: genreId,
            language: 'pt-BR'
        }
    });
    tv.value = response.data.results
    isLoading.value = false;
};

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('tv')
  isLoading.value = false
})

</script>
<template>
    <h1>Filmes</h1>
    <ul class="genre-list">
      <loading v-model:active="isLoading" is-full-page />
      <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listtv(genre.id)"
      class="genre-item"
    >
    
      {{ genre.name }}
    
    </li>
    </ul>
    <div class="tv-list">
  <div v-for="tv in tv" :key="tv.id" class="tv-card">
    
    <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name" />
    <div class="tv-details">
      <p class="tv-name">{{ tv.name }}</p>
      <p class="tv-release-date">{{ formatDate(tv.release_date) }}</p>
      <p class="tv-genres">
        <span v-for="genre_id in tv.genre_ids" :key="genre_id" @click="listtv(genre_id)">
    {{ genreStore.getGenreName(genre_id) }}
  </span>
</p>

    </div>
    
  </div>
</div>
  </template>

  <style scoped>
  .genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    list-style: none;
    padding: 0;
  }
  
  .genre-item {
    background-color: #387250;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    color: #fff;
  }
  
  .genre-item:hover {
    cursor: pointer;
    background-color: #4e9e5f;
    box-shadow: 0 0 0.5rem #387250;
  }
  .tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.tv-details {
  padding: 0 0.5rem;
}

.tv-name {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.tv-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

  </style>