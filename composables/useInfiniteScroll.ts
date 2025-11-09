import { ref, onMounted, onBeforeUnmount, watch, type Ref } from 'vue';

export function useInfiniteScroll(
  hasMore: Ref<boolean>,
  isLoading: Ref<boolean>,
  onLoadMore: () => Promise<void> | void
) {
  const sentinel = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver | null = null;
  let stopWatch: (() => void) | null = null;

  const handleIntersect = async (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry?.isIntersecting && !isLoading.value && hasMore.value) {
      await onLoadMore();
    }
  };

  onMounted(() => {
    stopWatch = watch(
      () => sentinel.value,
      newEl => {
        observer?.disconnect();
        observer = null;

        if (!newEl || typeof IntersectionObserver === 'undefined') {
          return;
        }

        observer = new IntersectionObserver(handleIntersect, {
          rootMargin: '200px',
        });

        observer.observe(newEl);
      },
      { immediate: true }
    );
  });

  onBeforeUnmount(() => {
    stopWatch?.();
    observer?.disconnect();
  });

  return {
    sentinel,
  };
}
