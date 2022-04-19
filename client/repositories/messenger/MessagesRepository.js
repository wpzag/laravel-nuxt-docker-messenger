export default ({ $axios }) => ({
  store(threadId, params) {
    return $axios.$post(`/messenger/threads/${threadId}/messages`, params);
  },
  edit(threadId, messageId, message) {
    return $axios.$put(`/messenger/threads/${threadId}/messages/${messageId}`, {
      message,
    });
  },
  remove(threadId, messageId) {
    return $axios.$delete(
      `/messenger/threads/${threadId}/messages/${messageId}`
    );
  },
  react(threadId, messageId, reaction) {
    return $axios.$post(
      `/messenger/threads/${threadId}/messages/${messageId}/reactions`,
      { reaction }
    );
  },
  markRead(threadId) {
    return $axios.$get(`/messenger/threads/${threadId}/mark-read`);
  },
  removeReact(threadId, messageId, id) {
    return $axios.$delete(
      `/messenger/threads/${threadId}/messages/${messageId}/reactions/${id}`
    );
  },
});
