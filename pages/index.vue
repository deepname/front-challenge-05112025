<template>
  <div class="page">
    <header class="page__header">
      <h1 class="page__title">News Browser</h1>
      <nav class="page__nav">
        <NuxtLink to="/favorites" class="page__link">
          Favorites ({{ favoritesStore.favorites.length }})
        </NuxtLink>
      </nav>
    </header>

    <div class="page__search">
      <SearchBar v-model="searchQuery" />
    </div>

    <main class="page__content">
      <div v-if="newsStore.isLoading && newsStore.articles.length === 0" class="page__loading">
        Loading...
      </div>

      <div v-else-if="newsStore.articles.length === 0" class="page__empty">
        No articles found
      </div>

      <div v-else class="page__articles">
        <NewsCard
          v-for="article in newsStore.articles"
          :key="article.url"
          :article="article"
        />
      </div>

      <div ref="sentinel" class="page__sentinel"></div>

      <div v-if="newsStore.isLoading && newsStore.articles.length > 0" class="page__loading-more">
        Loading more...
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const newsStore = useNewsStore()
const favoritesStore = useFavoritesStore()

const searchQuery = ref('')

// Sync search query with URL
useUrlSync('q', searchQuery)

// Watch search query and trigger search
watch(searchQuery, async (newQuery) => {
  if (newQuery) {
    await newsStore.search(newQuery)
  } else {
    newsStore.reset()
    await newsStore.loadMore()
  }
})

// Infinite scroll
const { sentinel } = useInfiniteScroll(
  computed(() => newsStore.hasMore),
  computed(() => newsStore.isLoading),
  () => newsStore.loadMore()
)

// Initial load
onMounted(async () => {
  if (newsStore.articles.length === 0 && !searchQuery.value) {
    await newsStore.loadMore()
  }
})
</script>

<style scoped lang="scss">
  $color_1: #111827;
  $color_2: white;
  $color_3: #6b7280;
  $background-color_1: #2563eb;
  $background-color_2: #1d4ed8;
  $border-color_1: #e5e7eb;

  .page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid $border-color_1;
    }
    &__title {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      color: $color_1;
    }
    &__nav {
      display: flex;
      gap: 1rem;
    }
    &__link {
      padding: 0.5rem 1rem;
      background-color: $background-color_1;
      color: $color_2;
      text-decoration: none;
      border-radius: 0.375rem;
      font-weight: 500;
      transition: background-color 0.2s;
      &:hover {
        background-color: $background-color_2;
      }
    }
    &__search {
      margin-bottom: 2rem;
    }
    &__content {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    &__loading {
      padding: 2rem;
      text-align: center;
      color: $color_3;
      &-more {
        padding: 2rem;
        text-align: center;
        color: $color_3;
      }
    }
    &__empty {
      padding: 2rem;
      text-align: center;
      color: $color_3;
    }
    &__sentinel {
      height: 1px;
    }
  }
</style>
