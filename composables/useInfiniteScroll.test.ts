import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, nextTick, type Ref } from 'vue';
import { useInfiniteScroll } from './useInfiniteScroll';

describe('useInfiniteScroll', () => {
  let hasMore: Ref<boolean>;
  let isLoading: Ref<boolean>;
  let onLoadMore: ReturnType<typeof vi.fn>;
  let intersectionObserverMock: ReturnType<typeof vi.fn>;
  let observeSpy: ReturnType<typeof vi.fn>;
  let disconnectSpy: ReturnType<typeof vi.fn>;
  let triggerIntersect:
    | ((entries: IntersectionObserverEntry[]) => Promise<void> | void)
    | undefined;
  let observerOptions: IntersectionObserverInit | undefined;
  let originalIntersectionObserver: typeof IntersectionObserver | undefined;

  const createTestComponent = () => ({
    template: '<div><div ref="sentinel" data-testid="sentinel"></div></div>',
    setup() {
      const { sentinel } = useInfiniteScroll(hasMore, isLoading, onLoadMore);
      return { sentinel };
    },
  });

  beforeEach(() => {
    hasMore = ref(true);
    isLoading = ref(false);
    onLoadMore = vi.fn();

    intersectionObserverMock = vi.fn();
    observeSpy = vi.fn();
    disconnectSpy = vi.fn();
    triggerIntersect = undefined;
    observerOptions = undefined;

    originalIntersectionObserver = global.IntersectionObserver;

    intersectionObserverMock.mockImplementation(
      (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
        observerOptions = options;

        const thresholdsRaw = options?.threshold;
        const thresholds =
          thresholdsRaw === undefined
            ? []
            : Array.isArray(thresholdsRaw)
              ? thresholdsRaw
              : [thresholdsRaw];

        const observerInstance: IntersectionObserver = {
          root: options?.root ?? null,
          rootMargin: options?.rootMargin ?? '0px',
          thresholds,
          observe(target: Element) {
            observeSpy(target);
          },
          unobserve(_target: Element) {},
          disconnect() {
            disconnectSpy();
          },
          takeRecords(): IntersectionObserverEntry[] {
            return [];
          },
        };

        triggerIntersect = entries => callback(entries, observerInstance);

        return observerInstance;
      }
    );

    global.IntersectionObserver =
      intersectionObserverMock as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
    if (originalIntersectionObserver) {
      global.IntersectionObserver = originalIntersectionObserver;
    } else {
      delete (global as { IntersectionObserver?: typeof IntersectionObserver })
        .IntersectionObserver;
    }
  });

  it('returns sentinel ref', async () => {
    const wrapper = mount(createTestComponent());
    await nextTick();

    expect(wrapper.vm.sentinel).toBeInstanceOf(HTMLElement);
  });

  it('sets up IntersectionObserver once sentinel attaches', async () => {
    const wrapper = mount(createTestComponent());
    await nextTick();

    await nextTick();

    expect(intersectionObserverMock).toHaveBeenCalledTimes(1);
    expect(observerOptions?.rootMargin).toBe('200px');
    expect(observeSpy).toHaveBeenCalledWith(wrapper.vm.sentinel);
  });

  it('calls onLoadMore when intersecting and conditions met', async () => {
    mount(createTestComponent());
    await nextTick();

    await triggerIntersect?.([{ isIntersecting: true } as IntersectionObserverEntry]);

    expect(onLoadMore).toHaveBeenCalled();
  });

  it('does not call onLoadMore when not intersecting', async () => {
    mount(createTestComponent());
    await nextTick();

    await triggerIntersect?.([{ isIntersecting: false } as IntersectionObserverEntry]);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('does not call onLoadMore when loading', async () => {
    isLoading.value = true;

    mount(createTestComponent());
    await nextTick();

    await triggerIntersect?.([{ isIntersecting: true } as IntersectionObserverEntry]);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('does not call onLoadMore when no more items', async () => {
    hasMore.value = false;

    mount(createTestComponent());
    await nextTick();

    await triggerIntersect?.([{ isIntersecting: true } as IntersectionObserverEntry]);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('disconnects observer on unmount', async () => {
    const wrapper = mount(createTestComponent());
    await nextTick();

    wrapper.unmount();

    expect(disconnectSpy).toHaveBeenCalled();
  });
});
