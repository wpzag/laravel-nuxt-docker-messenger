import ApiModule from "./helpers/ApiModule";

let pagination = new ApiModule("/messenger/threads");
export const state = () => ({
  ...pagination.state,
  searchList: [],
  query: "",
});
// getters
export const getters = {
  ...pagination.getters,
};

// mutations
export const mutations = {
  ...pagination.mutations,
  resetCount(state, index) {
    state.list[index].unread_count = 0;
  },
  avatar(state, { id, avatar }) {
    const index = this.$messenger.thread.find(id);
    if (index !== null) state.list[index].avatar = avatar;
  },
  name(state, { id, name }) {
    const index = this.$messenger.thread.find(id);
    if (index !== null) state.list[index].name = name;
  },
  add(state, thread) {
    const index = this.$messenger.thread.find(thread.id);
    if (index === null) {
      state.list.unshift(thread);
    }
  },
  remove(state, id) {
    const index = this.$messenger.thread.find(id);
    if (index !== null) {
      state.list.splice(index, 1);
    }
  },
};

export const actions = {
  ...pagination.actions,
  update({ state, dispatch }, { threadId, latestMessage }) {
    const index = this.$messenger.thread.find(threadId);
    if (index == null && latestMessage) {
      dispatch("add", latestMessage.thread_id);
      return;
    }
    if (index !== null && latestMessage) {
      if (this.$messenger.activeThreadId() !== threadId) {
        state.list[index].unread_count++;
      }
      state.list[index].resources.latest_message = latestMessage;
      let thread = this.$_.cloneDeep(state.list[index]);
      state.list.splice(index, 1);
      state.list = [thread, ...state.list];
    }
  },
  async add({ state, commit }, thread_id) {
    if (this.$messenger.thread.find(thread_id) !== null) return;
    const thread = await this.$api.messenger.thread.show(thread_id);
    commit("add", thread);
  },
};
