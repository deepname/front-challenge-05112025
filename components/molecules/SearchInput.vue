<template>
  <div class="search-input">
    <BaseInput
      v-model="model"
      type="search"
      size="lg"
      placeholder="Search news..."
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()
</script>

<style scoped lang="scss">
@use "~/assets/utils";

.search-input {
  width: 100%;
  max-width: utils.toRem(600px);
  margin: 0 auto;
}
</style>
