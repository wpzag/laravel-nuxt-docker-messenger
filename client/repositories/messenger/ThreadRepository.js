export default ({ $axios, $messenger }) => ({
  async load(id) {
    return await $axios.$get(
      `/messenger/threads/${id}/load/messages|participants|mark-read`
    );
  },
  async show(id) {
    return await $axios.$get(`/messenger/threads/${id}`);
  },
  async loadFiles(type) {
    let id = $messenger.activeThreadId();
    return await $axios.$get(`/messenger/threads/${id}/${type}`);
  },
  async getSettings() {
    return await $axios.$get(
      `/messenger/threads/${$messenger.activeThreadId()}/settings`
    );
  },
  async updateSettings(params) {
    return await $axios.$put(
      `/messenger/threads/${$messenger.activeThreadId()}/settings`,
      params
    );
  },
  getUserPrivateThread(id) {
    return $axios.$get(`/messenger/privates/recipient/user/${id}`);
  },
  leave() {
    return $axios.$post(
      `/messenger/threads/${$messenger.activeThreadId()}/leave`
    );
  },
  delete() {
    return $axios.$delete(`/messenger/threads/${$messenger.activeThreadId()}`);
  },
  storePrivateThread(params) {
    return $axios.$post(`/messenger/privates`, params);
  },
  approve(params) {
    return $axios.$post(
      `/messenger/threads/${$messenger.activeThreadId()}/approval`,
      params
    );
  },
});
