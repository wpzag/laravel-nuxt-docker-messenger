// mutations

import Vue from "vue";

export const state = () => ({
  reactionDialog: false,
  message: null,
});
export const mutations = {
  reactionDialog(state, { dialog, message }) {
    state.reactionDialog = dialog;
    if (message !== null) state.message = message;
  },
};
export const actions = {
  add({ state, rootState, commit }, reaction) {
    let reactionName = reaction.reaction;
    // find message that is reacted to
    const msg = this.$messenger.message.find(
      reaction.message_id,
      rootState.messenger.thread.messages.list
    );
    if (!msg) return;

    const { groupIndex, messageIndex, message } = msg;

    if (!message.reactions) {
      // This is to trigger reactivity
      Vue.set(message, "reacted", true);
      Vue.set(message, "reactions", {});
      Vue.set(message.reactions, "data", {});

      message.reactions.data = Object.assign(
        {},
        message.reactions.data,

        { [reactionName]: [reaction] }
      );
    } else if (message.reactions?.data?.hasOwnProperty(reactionName)) {
      message.reactions.data[reactionName].push(reaction);
    } else {
      rootState.messenger.thread.messages.list[groupIndex].messages[
        messageIndex
      ].reactions.data = Object.assign(
        {},
        rootState.messenger.thread.messages.list[groupIndex].messages[
          messageIndex
        ].reactions.data,
        {
          [reactionName]: [reaction],
        }
      );
    }
  },
  remove({ state, rootState }, reaction) {
    const msg = this.$messenger.message.find(
      reaction.message_id,
      rootState.messenger.thread.messages.list
    );
    if (!msg) return;
    const { groupIndex, messageIndex, message } = msg;

    let reactions =
      rootState.messenger.thread.messages.list[groupIndex].messages[
        messageIndex
      ].reactions;
    let reactionName = reaction.reaction;
    const reactionIndex = this.$_.findIndex(
      reactions.data[reactionName],
      (el) => el.id === reaction.id
    );
    if (reactionIndex !== null)
      reactions.data[reactionName].splice(reactionIndex, 1);
    if (reactions.data[reactionName].length === 0) {
      Vue.delete(reactions.data, reactionName);
    }
  },
};
