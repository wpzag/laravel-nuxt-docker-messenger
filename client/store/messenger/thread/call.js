export const state = () => ({
    calling: false,
    connecting: false,
    call: null,
    isCaller: false,
    incomingCall: false,
    interval: null,
    initJitsi: false
})

// mutations
export const mutations = {
    show(state, show) {
        state.show = show
    },
    call(state, call) {
        state.call = call
    },

    connecting(state, payload) {
        state.connecting = payload
    },
    calling(state, payload) {
        state.calling = payload
    },
    initJitsi(state, payload) {
        state.initJitsi = payload
    },
    incomingCall(state, incomingCall) {
        if (incomingCall !== null) {
     
            console.log("%cCall  Incoming ", "color: blue")

            // this.$messenger.sounds.call.play();
        }
        state.incomingCall = incomingCall
    },
    reset(state) {
        clearInterval(state.interval)

        state.calling = false
        state.connecting = false
        state.call = null
        state.incomingCall = false
        state.interval = null
        state.initJitsi = false
        state.isCaller = false
        this.$messenger.sounds.call.pause()
        this.$messenger.sounds.call.currentTime = 0
    }
}

export const actions = {
    async start({state, commit, dispatch}) {
        const {type, id} = this.$messenger.activeThread()

        state.show = true
        state.isCaller = true

        if (type === 1) {
            //private call

            // show loader
            commit("connecting", true)

            // start the call
            let call = await this.$api.messenger.calls
                .start(id)
                .catch(() => (state.calling = state.connecting = false))

            // call = await this.$api.messenger.calls.show(id, call.id)
            if (!call) return

            // set call and remove loader
            commit("call", call)
            commit("connecting", false)

            // start ringing sound
            this.$messenger.sounds.call.play()

            // show calling popup
            state.calling = true
        } else {
            //group
            commit("connecting", true)
            const call = await this.$api.messenger.calls
                .start(id)
                .catch(() => commit("connecting", false))
            dispatch("setup", {call_id: call.id, thread_id: id})
        }
    },
    async setup({state, commit, dispatch}, {call_id, thread_id}) {
        const call = await this.$api.messenger.calls.show(thread_id, call_id)

        commit("call", call)
        state.interval = setInterval(() => {
            this.$axios.$get(
                `/messenger/threads/${thread_id}/calls/${call_id}/heartbeat`
            )
        }, 30000)
    },
    async hangup({commit, dispatch, getters, state}) {
        const thread_id = getters.thread_id
        await this.$axios
            .$post(`/messenger/threads/${thread_id}/calls/${state.call?.id}/leave`)
            .catch((e) => commit("reset"))
        commit("reset")
    },
    async leave({commit}, {thread_id, call_id}) {
        this.$messenger.sounds.call.pause()
        this.$messenger.sounds.call.currentTime = 0

        await this.$axios.$post(
            `/messenger/threads/${thread_id}/calls/${call_id}/leave`
        )

        commit("reset")
        // commit("threads/resetActiveCall", thread_id, { root: true });
    },
    async end({commit}, {thread_id, call_id}) {
        this.$messenger.sounds.call.pause()
        this.$messenger.sounds.call.currentTime = 0

        await this.$api.messenger.calls
            .end(thread_id, call_id)
            .catch((e) => commit("reset"))

        commit("reset")
    },
    async ignore({commit}, {thread_id, call_id}) {
        commit("reset")

        this.$messenger.sounds.call.pause()
        this.$messenger.sounds.call.currentTime = 0

        await this.$api.messenger.calls
            .ignore(thread_id, call_id)
            .catch((e) => commit("reset"))
    },

    async join({state, commit, dispatch}, {thread_id, call_id}) {
        // Pause ringing sound
        this.$messenger.sounds.call.pause()
        this.$messenger.sounds.call.currentTime = 0

        console.log("#############################STOPPING SOUND")

        // Hide incoming call dialog
        commit("incomingCall", false)

        // Show loader
        commit("connecting", true)

        // Join Call
        await this.$api.messenger.calls
            .join(thread_id, call_id)
            .catch((e) => commit("reset"))

        // Set Call and start heartbeat
        await dispatch("setup", {call_id, thread_id})

        // Remove Loader
        commit("connecting", false)
        // Show jitsi window
        commit("initJitsi", true)
    },
    async privateCallJoined({state, commit, dispatch}, {thread_id, call_id}) {
        // Pause ringing sound
        this.$messenger.sounds.call.pause()
        this.$messenger.sounds.call.currentTime = 0
        console.log("#############################STOPPING SOUND")

        commit("calling", false)

        // Show loader
        commit("connecting", true)

        // Join Call
        await this.$api.messenger.calls
            .join(thread_id, call_id)
            .catch((e) => commit("reset"))

        // Set Call and start heartbeat
        await dispatch("setup", {call_id, thread_id})

        // Remove Loader
        commit("connecting", false)

        // Show jitsi window
        commit("initJitsi", true)
    },

    async add({commit}, {id, message}) {
        const {data} = await this.$axios.$post("/messenger/privates", {
            message: message,
            recipient_id: id,
            recipient_alias: "user"
        })
        commit("add", data)
    }
}
