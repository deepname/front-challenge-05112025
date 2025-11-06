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
@use "~/assets/variables";
@use "~/assets/utils";

.page {
  max-width: utils.toRem(1200px);
  margin: 0 auto;
  padding: 1rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: utils.toRem(2px) solid variables.$border-color;
  }
  &__title {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    color: variables.$text-color;
  }
  &__nav {
    display: flex;
    gap: 1rem;
  }
  &__link {
    padding: 0.5rem 1rem;
    background-color: variables.$text-color-hover;
    color: variables.$bone-color;
    text-decoration: none;
    border-radius: 0.375rem;
    font-weight: 500;
    transition: background-color 0.2s;
    &:hover {
      background-color: variables.$hover-color;
    }
  }
  &__search {
    margin-bottom: 2rem;
  }
  &__content {
    background: variables.$bone-color;;
    border-radius: 0.5rem;
    box-shadow: 0 utils.toRem(1px) utils.toRem(3px) rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  &__loading {
    padding: 2rem;
    text-align: center;
    color: variables.$text-page-color;
    &-more {
      padding: 2rem;
      text-align: center;
      color: variables.$text-page-color;
    }
  }
  &__empty {
    padding: 2rem;
    text-align: center;
    color: variables.$text-page-color;
  }
  &__sentinel {
    height: utils.toRem(1px);
  }
}
</style>
