import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref, nextTick, defineComponent, type Ref } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { useRoute, useRouter } from 'vue-router';
import { useUrlSync } from './useUrlSync';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
}));

describe('useUrlSync', () => {
  let mockRoute: { query: Record<string, unknown> };
  let mockRouter: { replace: ReturnType<typeof vi.fn> };
  let state: Ref<string>;
  let wrappers: VueWrapper[];

  beforeEach(() => {
    vi.clearAllMocks();

    mockRoute = {
      query: {},
    };

    mockRouter = {
      replace: vi.fn(({ query }: { query: Record<string, unknown> }) => {
        mockRoute.query = query;
        return Promise.resolve();
      }),
    };

    wrappers = [];

    // Mock composables
    vi.mocked(useRoute).mockReturnValue(mockRoute as never);
    vi.mocked(useRouter).mockReturnValue(mockRouter as never);

    state = ref('');
  });

  afterEach(() => {
    wrappers.forEach(wrapper => wrapper.unmount());
  });

  const mountComposable = (key = 'q') => {
    let result: ReturnType<typeof useUrlSync> | undefined;
    const TestComponent = defineComponent({
      setup() {
        result = useUrlSync(key, state);
        return () => null;
      },
    });

    const wrapper = mount(TestComponent);
    wrappers.push(wrapper);
    return result!;
  };

  const flushUpdates = async () => {
    await nextTick();
    await nextTick();
  };

  it('syncs from URL query to state on mount', () => {
    mockRoute.query = { q: 'test query' };

    mountComposable('q');

    expect(state.value).toBe('test query');
  });

  it('does not sync if URL query value is not a string', () => {
    mockRoute.query = { q: ['array', 'value'] };

    mountComposable('q');

    expect(state.value).toBe('');
  });

  it('updates URL when state changes to non-empty value', async () => {
    mockRoute.query = {};

    mountComposable('q');

    state.value = 'new query';

    await flushUpdates();

    expect(mockRouter.replace).toHaveBeenCalledWith({
      query: { q: 'new query' },
    });
  });

  it('removes query param when state becomes empty', async () => {
    mockRoute.query = { q: 'existing' };

    mountComposable('q');
    state.value = 'existing'; // Set initial state

    await flushUpdates();

    state.value = '';

    await flushUpdates();

    expect(mockRouter.replace).toHaveBeenCalledWith({
      query: {},
    });
  });

  it('preserves other query params when updating', async () => {
    mockRoute.query = { other: 'value' };

    mountComposable('q');

    state.value = 'query';

    await flushUpdates();

    expect(mockRouter.replace).toHaveBeenCalledWith({
      query: { other: 'value', q: 'query' },
    });
  });

  it('returns the state ref', () => {
    const result = mountComposable('q');

    expect(result.state).toBe(state);
  });
});
