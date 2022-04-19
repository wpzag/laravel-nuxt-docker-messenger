export default ({ $axios, $messenger }) => ({
  start(id) {
    return $axios.$post(`/messenger/threads/${id}/calls`);
  },
  end(thread_id, id) {
    return $axios.$post(`/messenger/threads/${thread_id}/calls/${id}/end`);
  },
  ignore(thread_id, id) {
    return $axios.$post(`/messenger/threads/${thread_id}/calls/${id}/ignore`);
  },
  join(thread_id, id) {
    return $axios.$post(`/messenger/threads/${thread_id}/calls/${id}/join`);
  },
  show(thread_id, id) {
    return $axios.$get(`/messenger/threads/${thread_id}/calls/${id}`);
  },
});
