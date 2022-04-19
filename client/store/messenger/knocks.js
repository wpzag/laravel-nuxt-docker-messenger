// state
export const state = () => ({
  visible: false,
  sender: null,
  thread: null,
});

// getters
export const getters = {
  visible: (state) => state.visible,
  sender: (state) => state.sender,
  thread: (state) => state.thread,
};

// mutations
export const mutations = {
  showKnock(state, event) {
    state.sender = event?.sender;
    state.thread = event?.thread;
    state.visible = true;
  },
  reset(state) {
    state.visible = false;
    state.sender = null;
    state.thread = null;
  },
};

export const actions = {
  incoming({ state, commit }, event) {
    commit("showKnock", event);
  },
};
