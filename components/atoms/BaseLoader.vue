<template>
  <span class="loader"></span>
</template>

<style scoped lang="scss">
@use '~/assets/variables.scss';
@use '~/assets/utils';

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  75%,
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
}

.loader {
  width: utils.toRem(48px);
  height: utils.toRem(48px);
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;

  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: utils.toRem(5px) solid variables.$kappa;
    animation: prixClipFix 2s linear infinite;
  }

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: utils.toRem(5px) solid variables.$kappa;
    animation: prixClipFix 2s linear infinite;
    inset: utils.toRem(8px);
    transform: rotate3d(90, 90, 0, 180deg);
    border-color: variables.$nu;
  }
}
</style>
