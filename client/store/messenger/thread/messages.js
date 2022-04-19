import Vue from "vue" // state
// state
export const state = () => ({
    list: [],
    next_route: null,
    loading: false,
    loaded: false,
    reply_to: null,
    fetchingMore: false
})

// getters
export const getters = {
    loading: (state) => state.loading,
    loaded: (state) => state.loaded
}

// mutations
export const mutations = {
    reset(state) {
        state.list = []
        state.next_route = null
        state.loading = false
        state.loaded = false
        state.thread_id = null
        state.reply_to = null
    },

    setMeta(state, meta) {
        state.loaded = meta?.final_page
        state.next_route = meta?.next_page_route
        state.loading = false
    },
    fetchingMore(state, payload) {
        state.fetchingMore = payload
    },

    load(state, messages) {
        const list = []
        messages.reverse().forEach((message) => {
            message.type = this.$messenger.message.getType(message)
            if (message.reply_to)
                message.reply_to.type = this.$messenger.message.getType(
                    message.reply_to
                )
            // If the message is a system message
            if (message.type === "system")
                return list.push({
                    owner: message.owner,
                    system_message: true,
                    messages: [message]
                })

            // If the message is the first one
            if (!list.length)
                return list.push({
                    owner: message.owner,
                    ownMessage:
                        this.$auth.user.id === message.owner_id && !message.from_bot,
                    messages: [message]
                })

            const lastGroupMessages = list[list.length - 1].messages
            const lastMessage = lastGroupMessages[lastGroupMessages.length - 1]

            // Check if this message has the same owner as the previous one
            if (
                message.owner_id === lastMessage.owner_id &&
                message.owner_type === lastMessage.owner_type &&
                !list[list.length - 1].system_message
            )
                return lastGroupMessages.push(message)

            // // If owner of message is not the same as the previous one

            list.push({
                owner: message.owner,
                ownMessage:
                    this.$auth.user.id === message.owner_id && !message.from_bot,
                messages: [message]
            })
        })

        // Add messages
        state.list = state.list.length ? [...list, ...state.list] : list
    },
    update(state, {groupIndex, messageIndex, message}) {
        Vue.set(state.list[groupIndex].messages, messageIndex, message)
    },
    reply_to(state, message) {
        state.reply_to = message
    },
    add(state, message) {
        let found = false
        state.list.forEach((group, gIndex) => {
            group.messages.forEach((msg, mIndex) => {
                if (msg.id === message.temporary_id) {
                    found = true
                }
            })
        })
        if (found) return
        const addGroup = (message) => {
            state.list.push({
                owner: message.owner,
                ownMessage:
                    this.$auth.user.id === message.owner_id && !message.from_bot,
                messages: [message]
            })
        }
        message.type = this.$messenger.message.getType(message)
        if (message.reply_to)
            message.reply_to.type = this.$messenger.message.getType(message.reply_to)
        // If the message is a system message
        if (message.type === "system")
            return state.list.push({
                owner: message.owner,
                system_message: true,
                messages: [message]
            })

        // If the message is the first one
        if (!state.list.length) return addGroup(message)

        // If the message is not the first one
        const lastGroupMessages = state.list[state.list.length - 1].messages
        const lastMessage = lastGroupMessages[lastGroupMessages.length - 1]

        // Check if this message has the same owner as the previous one
        if (
            message.owner_id === lastMessage.owner_id &&
            message.owner_type === lastMessage.owner_type &&
            !lastMessage.system_message
        )
            return lastGroupMessages.push(message)

        // If owner of message is not the same as the previous one
        addGroup(message)
        // });

        // Add messages
        // state.list = state.list.length ? [...list, ...state.list] : list;
    },
    remove(state, {message_id, thread_id}) {
        if (!this.$messenger.isActiveThread(thread_id)) return
        const msg = this.$messenger.message.find(message_id, state.list)
        if (!msg) return
        const {groupIndex, messageIndex} = msg
        // If it's the only message in the group then delete the whole group
        if (state.list[groupIndex]?.messages?.length === 1)
            return state.list.splice(groupIndex, 1)

        // If not the only message then just delete it off the group
        state.list[groupIndex]?.messages.splice(messageIndex, 1)
    }
}

export const actions = {
    init({state, commit}, {messages: {data, meta}}) {
        commit("reset")
        commit("setMeta", meta)
        if (!data.length) return
        commit("load", data)
        setTimeout(() => this.$messenger.scrollToBottom(true), 200)
    },

    async destroy({state, commit}, message) {
        await this.$api.messenger.messages.remove(message.thread_id, message.id)
        commit("remove", {message_id: message.id, thread_id: message.thread_id})
    },
    async more({state, commit, rootState}) {
        if (
            state.loaded ||
            state.loading ||
            rootState.messenger.activeThread.loading
        )
            return

        commit("fetchingMore", true)

        state.loading = true

        // Load messages from api
        const {data, meta} = await this.$api.messenger.base.load(
            state.next_route
        )

        commit("setMeta", meta)
        commit("load", data)

        state.loading = false
    },
    async store({state, commit, dispatch, rootState}, {message, file, type}) {
        const id = this.$messenger.activeThreadId()

        if (message?.type === 0) {
            // state.list.unshift(message);
            commit("add", message)
            // setTimeout(() => this.$scrollToBottom(), 2);

            if (state.reply_to) message.reply_to_id = state.reply_to.id

            // Get added message index
            const msg = this.$messenger.message.find(
                message.temporary_id,
                state.list
            )
            if (!msg) return

            const {groupIndex, messageIndex} = msg

            message = await this.$api.messenger.messages
                .store(id, message)
                .catch((e) => {
                    commit("remove", {message_id: message.id, thread_id: id})
                })

            commit("reply_to", null)

            if (message.reply_to)
                message.reply_to.type = this.$messenger.message.getType(
                    message.reply_to
                )
            commit("update", {
                groupIndex,
                messageIndex,
                message: {
                    ...message,
                    type: this.$messenger.message.getType(message)
                }
            })
        } else {
            dispatch(
                "messenger/thread/uploads/upload",
                {file, type},
                {root: true}
            )
        }

        // if message if file
        // const file = payload.message;
    },
    incoming({commit, rootState, dispatch}, message) {
        if (this.$messenger.activeThreadId() === message.thread_id) {
            // avoid directly mutating the message object
            commit("add", this.$_.cloneDeep(message))
            this.$api.messenger.messages.markRead(message.thread_id)
        }

        this.$messenger.sounds.message.play()

        dispatch(
            "messenger/threads/update",
            {
                threadId: message.thread_id,
                latestMessage: message
            },
            {root: true}
        )
    }
}
