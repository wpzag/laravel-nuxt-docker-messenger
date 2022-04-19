export default ({ $axios, $messenger }) => ({
  index() {
    return $axios.$get(`/messenger/friends`);
  },
  destroy(id) {
    return $axios.$delete(`/messenger/friends/${id}`);
  },
  add(params) {
    return $axios.$post(`messenger/friends/sent`, params);
  },
  pendingIndex() {
    return $axios.$get(`messenger/friends/pending`);
  },
  approve(id) {
    return $axios.$put(`messenger/friends/pending/${id}`);
  },
  deny(id) {
    return $axios.$delete(`messenger/friends/pending/${id}`);
  },
});
