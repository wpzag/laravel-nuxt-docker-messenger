export default ({ $axios, $messenger }) => ({
  index() {
    return $axios.$get(`/messenger/users`);
  },
});
