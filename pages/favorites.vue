<template>
  <div class="page">
    <header class="page__header">
      <h1 class="page__title">Favorites</h1>
      <nav class="page__nav">
        <NuxtLink to="/" class="page__link">
          Back to News
        </NuxtLink>
      </nav>
    </header>

    <main class="page__content">
      <div v-if="favoritesStore.favorites.length === 0" class="page__empty">
        No favorites yet. Start adding articles from the main page!
      </div>

      <div v-else class="page__articles">
        <NewsCard
          v-for="article in favoritesStore.favorites"
          :key="article.url"
          :article="article"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const favoritesStore = useFavoritesStore()
</script>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.page__title {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
}

.page__nav {
  display: flex;
  gap: 1rem;
}

.page__link {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.page__link:hover {
  background-color: #1d4ed8;
}

.page__content {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.page__empty {
  padding: 4rem 2rem;
  text-align: center;
  color: #6b7280;
  font-size: 1.125rem;
}
</style>
