import { ref, useContext, watch } from "@nuxtjs/composition-api";

const useMessengerPagination = (url) => {
  const loading = ref(false);
  const loaded = ref(false);
  const list = ref([]);
  const next_page_route = ref(null);
  const ctx = useContext();
  const q = ref("");
  watch(q, () => {
    fetch();
  });
  const reset = () => {
    list.value = [];
    next_page_route.value = null;
    loaded.value = false;
    loading.value = false;
    q.value = "";
  };

  const fetch = async () => {
    if (loading.value || loaded.value)
      // if loaded all records
      return;

    // if initial fetch
    if (!next_page_route.value) reset();

    // start loading
    loading.value = true;

    // fetch data
    const { data, total, to, next_page_url } = await ctx.$axios.$get(
      next_page_route.value ?? url,
      { params: { q: q.value } }
    );

    // set meta
    loaded.value = total === to;
    next_page_route.value = next_page_url;

    // set data
    list.value = [...list.value, ...data];

    // stop loading
    loading.value = false;
  };

  return {
    loading,
    loaded,
    list,
    fetch,
  };
};
export default useMessengerPagination;
