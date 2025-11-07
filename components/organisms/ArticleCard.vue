<template>
  <article class="article-card">
    <div class="article-card__header">
      <h2 class="article-card__title">
        <a :href="article.url" target="_blank" rel="noopener noreferrer">
          {{ article.title }}
        </a>
      </h2>
      <FavoriteToggle :article="article" />
    </div>
    
    <div class="article-card__meta">
      <span class="article-card__score">{{ article.score }} points</span>
      <span class="article-card__separator">•</span>
      <span class="article-card__user">by {{ article.user }}</span>
      <span class="article-card__separator">•</span>
      <span class="article-card__age">{{ article.age }}</span>
      <span class="article-card__separator">•</span>
      <span class="article-card__comments">{{ article.comments }} comments</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import FavoriteToggle from '../molecules/FavoriteToggle.vue'
import type { NewsArticle } from '~/types/news'

defineProps<{
  article: NewsArticle
}>()
</script>

<style scoped lang="scss">
@use "~/assets/variables";
@use "~/assets/utils";

.article-card {
  padding: 1rem;
  border-bottom: utils.toRem(1px) solid variables.$border-color;
  transition: background-color 0.2s;

  &:hover {
    background-color: variables.$news-card-background;
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
      color: variables.$text-color;
      text-decoration: none;

      &:hover {
        color: variables.$text-color-hover;
      }
    }
  }

  &__meta {
    display: flex;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: variables.$text-info-color;
  }

  &__separator {
    color: variables.$separator;
  }
}
</style>
