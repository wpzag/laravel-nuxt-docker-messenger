import axios from "axios"

export const state = () => ({
    options: {
        name: null,
        avatar: {sm: null, md: null, lg: null},
        add_participants: false,
        invitations: true,
        calling: true,
        messaging: true,
        chat_bots: false,
        knocks: true
    }
})

// mutations
export const mutations = {
    reset(state) {
        state.options = {
            name: null,
            avatar: {sm: null, md: null, lg: null},
            add_participants: false,
            invitations: false,
            calling: false,
            messaging: false,
            chat_bots: false,
            knocks: false
        }
    }
}

export const actions = {
    async fetch({state}) {
        state.options = await this.$api.messenger.thread.getSettings()
    },

    async avatar({state, rootGetters, commit}, image) {
        state.loading = true

        const {id} = rootGetters["thread/thread"]

        let formData = new FormData()
        formData.append("image", image)
        const {data} = await axios.post(
            `/api/messenger/threads/${id}/avatar`,
            formData
        )

        state.loading = false
        commit("thread/setThreadAvatar", data.avatar, {root: true})
    },
    async update({state, commit, dispatch, rootState}, options) {
        state.loading = true

        const opt = this.$_.cloneDeep(options)
        opt["subject"] = opt["name"]
        const data = await this.$api.messenger.thread.updateSettings(opt)

        let permissions = rootState.messenger.activeThread.permissions

        permissions.manage_bots = data.chat_bots
        permissions.knock = data.knocks
        permissions.message = data.messaging
        permissions.call = data.calling
        permissions.invitations = data.invitations
        permissions.add_participants = data.add_participants

        // commit("setThreadOptions", data);
        this.$toast.success("Group updated successfully !")

        state.loading = false
        this.$messenger.to("threads.current.settings", true)

        commit("messenger/activeThread/name", data.name, {root: true})
        commit(
            "messenger/threads/name",
            {id: this.$messenger.activeThreadId(), name: data.name},
            {root: true}
        )
    },
    async mute({state, rootGetters}) {
        const {id} = rootGetters["thread/thread"]
        if (state.auth.muted) {
            state.loading = true
            await axios.post(`/api/messenger/threads/${id}/unmute`)
            state.loading = false

            state.auth.muted = false
        } else {
            state.loading = true

            await axios.post(`/api/messenger/threads/${id}/mute`)
            state.loading = false

            state.auth.muted = true
        }
    }
}
