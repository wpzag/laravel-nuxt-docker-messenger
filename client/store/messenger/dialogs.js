export const state = () => ({
  lightbox: { show: false, src: null, type: null },
  editMessage: { show: false, message: null },
  messageEdits: { show: false, message: null },
  addParticipant: { show: false },
});

export const mutations = {
  openLightBox(state, { src, type }) {
    state.lightbox.src = src;
    state.lightbox.type = type;
    state.lightbox.show = true;
  },
  hideLightBox(state) {
    state.lightbox = { show: false, src: null, type: null };
  },
  editMessage(state, { message, show }) {
    if (message) state.editMessage.message = message;
    state.editMessage.show = show;
  },
  messageEdits(state, { message, show }) {
    if (message) state.messageEdits.message = message;
    state.messageEdits.show = show;
  },
  addParticipant(state, { show }) {
    state.addParticipant.show = show;
  },
};
export const actions = {};
