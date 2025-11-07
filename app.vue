<template>
  <div id="app">
    <!-- Loading overlay shown during initial app load -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-container">
        <BaseLoader />
        <p class="loading-text">Loading...</p>
      </div>
    </div>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

// Hide loader after initial app load
onMounted(() => {
  // Small delay to ensure smooth transition
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});
</script>

<style lang="scss">
@use '~/assets/variables.scss';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: variables.$theta;
  color: variables.$alpha;
}

#app {
  min-height: 100vh;
}

/* Loading overlay styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: variables.$theta;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-text {
  color: variables.$zeta;
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
