import { onMounted, watch, nextTick, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useUrlSync(key: string, state: Ref<string>) {
  const route = useRoute();
  const router = useRouter();

  // Sync from URL to state on mount
  onMounted(() => {
    const urlValue = route.query[key];
    if (typeof urlValue === 'string') {
      state.value = urlValue;
    }
  });

  // Sync from state to URL on change
  watch(state, async newValue => {
    await nextTick();

    const query = { ...route.query };

    if (newValue) {
      query[key] = newValue;
      await router.replace({ query });
      return;
    }

    const { [key]: _removed, ...rest } = query;
    await router.replace({ query: rest });
  });

  return {
    state,
  };
}
