export const state = () => ({
  codeEditor: false,
  codeEditorContent: "console.log('Hello world !')",
  attachmentsActive: false,
});
export const getters = () => ({});
export const mutations = {
  codeEditor(state, payload) {
    state.codeEditor = payload;
  },
  codeEditorContent(state, payload) {
    state.codeEditorContent = payload;
  },

  attachmentsActive(state, payload) {
    state.attachmentsActive = payload;
  },
};
export const actions = {
  sendCodeMessage({ state, commit }, message) {
    commit("codeEditor", false);
    commit(
      "messenger/thread/messages/add",
      {
        id: "952038c7-50a1-415b-98df-83d2462a0c17",
        thread_id: "952038c7-4ee6-4c36-84c2-1cce41a19af1",
        type: "code",
        body: state.codeEditorContent,
        edited: false,
        from_bot: false,
        reacted: false,
        embeds: true,
        extra: null,
        created_at: "2021-12-16T12:04:00.785032Z",
        updated_at: "2021-12-16T12:04:00.785032Z",
      },
      { root: true }
    );
  },
};
