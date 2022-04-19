// state

export const state = () => ({
    thread: null,
    show: false,
    loading: false,
    distanceFromBottom: 0,

    permissions: {
        admin: false,
        add_participants: false,
        call: false,
        message: false,
        invitations: false,
        knock: false,
        muted: false,
        awaiting_my_approval: false,
        chat_bots: false,
        manage_bots: false
    }
})

// getters
export const getters = {
    thread: (state) => state.thread,
    show: (state) => state.show,
    loading: (state) => state.loading,
    pending: (state) => state.thread?.pending,
    avatar: (state) => state.thread?.avatar?.md,
    name: (state) => state.thread?.name
}

// mutations
export const mutations = {
    show(state, show) {
        state.show = show
    },
    loading(state, loading) {
        state.loading = loading
    },

    thread(state, thread) {
        state.thread = thread
    },
    pending(state, pending) {
        state.thread ? (state.thread.pending = pending) : false
    },
    name(state, name) {
        state.thread.name = name
    },
    avatar(state, avatar) {
        state.thread.avatar = avatar
    },
    reset(state, resetLoading) {
        state.show = false
        state.thread = null

        state.loading = false
    }
}

export const actions = {
    resetAll({state, commit, dispatch}) {
        commit("reset")
        dispatch("resetResources")
    },
    resetResources({state, commit}) {
        commit("messenger/thread/messages/reset", null, {root: true})
        commit("messenger/thread/participants/reset", null, {root: true})
        commit("messenger/thread/filesWidget/reset", null, {root: true})
        commit("messenger/thread/settings/reset", null, {root: true})
        commit("messenger/thread/uploads/reset", null, {root: true})
    },
    async create({dispatch, commit, state}, id) {
        const {recipient, thread_id} =
            await this.$api.messenger.thread.getUserPrivateThread(id)
        if (thread_id) {
            this.$messenger.to(`threads.${thread_id}`)
            dispatch("update", thread_id)
        } else {
            commit("loading", true)
            await dispatch("reset")
            commit("thread", {...recipient, newThread: true, resources: {}})
            commit("loading", false)
        }
    },
    async update({state, commit, dispatch, rootGetters}, id) {
        const prev_thread_id = state.thread?.id
        commit("reset")

        commit("loading", true)
        // Reset State
        await dispatch("resetResources")

        // Load thread

        const thread = await this.$api.messenger.thread.load(id)
        commit("thread", thread)

        // Reset unread_count
        const index = this.$messenger.thread.find(thread?.id)
        if (index !== null)
            commit("messenger/threads/resetCount", index, {root: true})

        const {
            resources: {messages, participants},
            options
        } = thread

        // Init messages
        await dispatch(
            "messenger/thread/messages/init",
            {messages},
            {root: true}
        )

        // Init participants
        await dispatch(
            "messenger/thread/participants/init",
            {participants},
            {root: true}
        )

        // Init thread settings
        state.permissions = options
        // await dispatch("messenger/thread/settings/init", options, { root: true });

        // Show thread
        commit("show", true)
        this.$messenger.scrollToBottom(true)

        await dispatch(
            "messenger/thread/echo/init",
            {id, prev_thread_id},

            {root: true}
        )

        commit("loading", false)

        dispatch(
            "messenger/thread/filesWidget/fetch",
            {type: "images"},
            {root: true}
        )

        return thread
    },
    async mute({state, commit, dispatch, rootGetters}) {
        if (state.permissions.muted) {
            await this.$axios.$post(
                `/messenger/threads/${this.$messenger.activeThreadId()}/unmute`
            )
            state.permissions.muted = false
        } else {
            await this.$axios.$post(
                `/messenger/threads/${this.$messenger.activeThreadId()}/mute`
            )

            state.permissions.muted = true
        }
    }
}
