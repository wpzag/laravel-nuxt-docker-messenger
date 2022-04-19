export default ({ $axios, $messenger }) => ({
  index() {
    return $axios.$get(
      `/messenger/threads/${$messenger.activeThreadId()}/participants`
    );
  },
  show(id) {
    return $axios.$get(
      `/messenger/threads/${$messenger.activeThreadId()}/participants/${id}`
    );
  },
  async store(form) {
    const { data } = form.post(
      `/messenger/threads/${$messenger.activeThreadId()}/participants`
    );
    return data;
  },
  delete(id) {
    return $axios.$delete(
      `/messenger/threads/${$messenger.activeThreadId()}/participants/${id}`
    );
  },
  promote(id) {
    return $axios.$post(
      `/messenger/threads/${$messenger.activeThreadId()}/participants/${id}/promote`
    );
  },
  demote(id) {
    return $axios.$post(
      `/messenger/threads/${$messenger.activeThreadId()}/participants/${id}/demote`
    );
  },
  update(id, options) {
    return $axios.$put(
      `/messenger/threads/${$messenger.activeThreadId()}/participants/${id}`,
      options
    );
  },
});
