import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue';

export function useInfiniteScroll(
  hasMore: Ref<boolean>,
  isLoading: Ref<boolean>,
  onLoadMore: () => Promise<void> | void
) {
  const sentinel = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver | null = null;

  const handleIntersect = async (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry?.isIntersecting && !isLoading.value && hasMore.value) {
      await onLoadMore();
    }
  };

  onMounted(() => {
    if (!sentinel.value) return;

    observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '200px',
    });

    observer.observe(sentinel.value);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return {
    sentinel,
  };
}
