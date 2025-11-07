<template>
  <AppLayout>
    <template #header>
      <PageHeader title="News Browser">
        <template #actions>
          <BaseLink to="/favorites"> Favorites ({{ favoritesStore.favorites.length }}) </BaseLink>
        </template>
      </PageHeader>
    </template>

    <template #search>
      <SearchInput v-model="searchQuery" />
    </template>

    <div v-if="newsStore.isLoading && newsStore.articles.length === 0" class="loading-state">
      Loading...
    </div>

    <div v-else-if="newsStore.articles.length === 0" class="empty-state">No articles found</div>

    <div v-else>
      <ArticleCard v-for="article in newsStore.articles" :key="article.url" :article="article" />

      <div ref="sentinel" class="sentinel" />

      <div v-if="newsStore.isLoading && newsStore.articles.length > 0" class="loading-more">
        Loading more...
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
const newsStore = useNewsStore();
const favoritesStore = useFavoritesStore();

const searchQuery = ref('');

// Sync search query with URL
useUrlSync('q', searchQuery);

// Watch search query and trigger search
watch(searchQuery, async newQuery => {
  if (newQuery) {
    await newsStore.search(newQuery);
  } else {
    newsStore.reset();
    await newsStore.loadMore();
  }
});

// Infinite scroll
const { sentinel } = useInfiniteScroll(
  computed(() => newsStore.hasMore),
  computed(() => newsStore.isLoading),
  () => newsStore.loadMore()
);

// Initial load
onMounted(async () => {
  if (newsStore.articles.length === 0 && !searchQuery.value) {
    await newsStore.loadMore();
  }
});
</script>

<style scoped lang="scss">
@use '~/assets/variables';
@use '~/assets/utils';

.loading-state,
.empty-state,
.loading-more {
  padding: 2rem;
  text-align: center;
  color: variables.$text-page-color;
}

.sentinel {
  height: utils.toRem(1px);
}
</style>
