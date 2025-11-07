<template>
  <div class="search-input">
    <BaseInput
      v-model="model"
      type="search"
      size="lg"
      placeholder="Search news..."
      class="search-input__field"
    />
  </div>
</template>

<script setup lang="ts">
import BaseInput from '../atoms/BaseInput.vue';

const model = defineModel<string>();
</script>

<style scoped lang="scss">
@use '~/assets/variables';
@use '~/assets/utils';

.search {
  &-input {
    width: 100%;
    max-width: utils.toRem(600px);
    margin: 0 auto;

    &__field {
      border: utils.toRem(2px) solid variables.$iota;
      border-radius: 0.5rem;
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: variables.$beta;
      }

      &::placeholder {
        color: variables.$delta;
      }
    }
  }
}
</style>
