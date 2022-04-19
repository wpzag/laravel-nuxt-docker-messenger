export default ({ $axios }) => ({
  async load(url) {
    return await $axios.$get(url);
  },
  getConfig() {
    return $axios.$get("/messenger");
  },
  getSettings() {
    return $axios.$get("/messenger/settings");
  },
  updateSettings(options) {
    return $axios.$put("/messenger/settings", options);
  },
});
