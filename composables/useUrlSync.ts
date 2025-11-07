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
    } else {
      // Create new object without the key instead of using delete
      const { [key]: deleted, ...rest } = query;
      Object.assign(query, rest);
    }

    router.replace({ query });
  });

  return {
    state,
  };
}
