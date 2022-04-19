import {
  computed,
  onBeforeMount,
  onMounted,
  ref,
  useContext,
  watch,
} from "@nuxtjs/composition-api";

const useMediaMessage = (message, type) => {
  const loading = ref(true);
  const height = ref(0);
  const width = ref(0);
  const ctx = useContext();

  const windowWith = computed(() => ctx.store.state.messenger.windowWidth);
  watch(windowWith, () => {
    setDimensions();
  });
  onBeforeMount(() => setDimensions());
  onMounted(() => {
    ctx.$messenger.scrollToBottom(
      false,
      false,
      document.getElementById("message-" + message.id)?.clientHeight
    );
  });
  const loadedHandler = () => {
    loading.value = false;
  };
  const setDimensions = () => {
    let { height: h, width: w } = ctx.$messenger.message.getDimensions(message);
    height.value = h;
    width.value = w;
  };
  const expand = () => {
    const src = {
      image: message.image?.lg,
      gif: message.body,
      wiki: message.extra.image,
    }[type];
    ctx.store.commit("messenger/dialogs/openLightBox", {
      src,
      type,
    });
  };

  return {
    loading,
    loadedHandler,
    height,
    width,
    expand,
  };
};
export default useMediaMessage;
