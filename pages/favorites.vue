<template>
  <AppLayout>
    <template #header>
      <PageHeader title="Favorites">
        <template #actions>
          <BaseLink to="/" variant="secondary">
            Back to News
          </BaseLink>
        </template>
      </PageHeader>
    </template>

    <div v-if="favoritesStore.favorites.length === 0" class="empty-state">
      No favorites yet. Start adding articles from the main page!
    </div>

    <div v-else>
      <ArticleCard
        v-for="article in favoritesStore.favorites"
        :key="article.url"
        :article="article"
      />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
const favoritesStore = useFavoritesStore()
</script>

<style scoped lang="scss">
@use "~/assets/variables";

.empty-state {
  padding: 4rem 2rem;
  text-align: center;
  color: variables.$text-page-color;
  font-size: 1.125rem;
}
</style>
