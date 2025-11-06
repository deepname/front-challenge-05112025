<template>
  <article class="news-card">
    <div class="news-card__header">
      <h2 class="news-card__title">
        <a :href="article.url" target="_blank" rel="noopener noreferrer">
          {{ article.title }}
        </a>
      </h2>
      <FavoriteButton :article="article" />
    </div>
    
    <div class="news-card__meta">
      <span class="news-card__score">{{ article.score }} points</span>
      <span class="news-card__separator">•</span>
      <span class="news-card__user">by {{ article.user }}</span>
      <span class="news-card__separator">•</span>
      <span class="news-card__age">{{ article.age }}</span>
      <span class="news-card__separator">•</span>
      <span class="news-card__comments">{{ article.comments }} comments</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { NewsArticle } from '~/types/news'

defineProps<{
  article: NewsArticle
}>()
</script>

<style scoped lang="scss">
@use "~/app/assets/variables";

.news-card {
  padding: 1rem;
  border-bottom: 1px solid variables.$border-color_1;
  transition: background-color 0.2s;
  &:hover {
    background-color: variables.$background-color_1;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  &__title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.4;
    flex: 1;
    a {
      color: variables.$color_1;
      text-decoration: none;
      &:hover {
        color: variables.$color_2;
      }
    }
  }
  &__meta {
    display: flex;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: variables.$color_3;
  }
  &__separator {
    color: variables.$color_4;
  }
}

</style>
