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
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useNewsStore } from '~/stores/newsStore';
import { useFavoritesStore } from '~/stores/favoritesStore';
import { useUrlSync } from '~/composables/useUrlSync';
import { useInfiniteScroll } from '~/composables/useInfiniteScroll';

const newsStore = useNewsStore();
const favoritesStore = useFavoritesStore();

const searchQuery = ref('');

// Sync search query with URL
useUrlSync('q', searchQuery);

const SEARCH_DEBOUNCE_MS = 400;
const MIN_QUERY_LENGTH = 2;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const resetAndLoad = async () => {
  newsStore.reset();
  await newsStore.loadMore();
};

const executeSearch = async (query: string) => {
  await newsStore.search(query);
};

const clearDebounce = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
};

// Watch search query and trigger search
watch(searchQuery, newQuery => {
  const trimmed = newQuery.trim();
  clearDebounce();

  if (!trimmed) {
    void resetAndLoad();
    return;
  }

  if (trimmed.length < MIN_QUERY_LENGTH) {
    return;
  }

  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    const current = searchQuery.value.trim();

    if (!current) {
      void resetAndLoad();
      return;
    }

    if (current.length < MIN_QUERY_LENGTH) {
      return;
    }

    void executeSearch(current);
  }, SEARCH_DEBOUNCE_MS);
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

onBeforeUnmount(() => {
  clearDebounce();
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
  color: variables.$zeta;
}

.sentinel {
  height: utils.toRem(1px);
}
</style>
