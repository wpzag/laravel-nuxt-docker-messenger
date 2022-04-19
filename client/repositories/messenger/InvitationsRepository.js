export default ({ $axios, $messenger }) => ({
  index() {
    return $axios.$get(
      `/messenger/threads/${$messenger.activeThreadId()}/invites`
    );
  },
  store(params) {
    return $axios.$post(
      `/messenger/threads/${$messenger.activeThreadId()}/invites`,
      params
    );
  },
  destroy(id) {
    return $axios.$delete(
      `/messenger/threads/${$messenger.activeThreadId()}/invites/${id}`
    );
  },
  join(id) {
    return $axios.$post(`/messenger/join/${id}`);
  },
  show(id) {
    return $axios.$get(`/messenger/join/${id}`);
  },
});
