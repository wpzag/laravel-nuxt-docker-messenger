export const state = () => ({
    init: false,
    config: false,
    settings: false,
    away: false,
    heartbeat: null,
    avatarDownloading: false,
    windowWidth: 0,
    windowHeight: 0
})
export const getters = {
    isDark: (state) => state.settings?.dark_mode,
    status: (state, getters, rootState) => {
        if (state.away || rootState.idleVue.isIdle) return 2
        if (!state.away) return 1
        return 0
    },
    mainPageHeight: (state) => {
        let h =
            state.windowWidth < 767 ? state.windowHeight - 80 : state.windowHeight
        return h + "px"
    }
}
export const mutations = {
    avatarDownloading(state, payload) {
        state.avatarDownloading = payload
    },
    darkMode(state, payload) {
        state.settings.dark_mode = payload
    },
    away(state, payload) {
        state.away = payload
    },
    settings(state, payload) {
        state.settings = payload
    },
    init(state, payload) {
        state.init = payload
    },
    reset() {
        state.init = false
        state.config = false
        state.settings = false
        state.away = false
        state.heartbeat = null
        state.windowWidth = 0
        state.windowHeight = 0
        clearInterval(state.heartbeat)
    }
}
export const actions = {
    async reset({dispatch, commit}) {
        commit("reset")
        await dispatch("messenger/activeThread/resetAll", null, {root: true})
        commit("messenger/threads/resetApi", null, {root: true})
    },

    async init({dispatch, commit, state}) {
        state.windowHeight = window.innerHeight
        state.windowWidth = window.innerWidth
        window.addEventListener("resize", () => {
            state.windowHeight = window.innerHeight
            state.windowWidth = window.innerWidth
        })

        // Configuring the auth user
        this.$auth.setUser({
            id: this.$auth?.user?.data?.base?.id,
            ...this.$auth?.user?.data
        })

        // Getting messenger config and settings
        state.config = await this.$api.messenger.base.getConfig()
        state.settings = await this.$api.messenger.base.getSettings()

        // Adding sounds
        this.$messenger.sounds = {}

        this.$messenger.sounds.message = new Audio("/messenger/sounds/message.mp3")
        this.$messenger.sounds.knock = new Audio("/messenger/sounds/knock.mp3")
        this.$messenger.sounds.call = new Audio("/messenger/sounds/call.mp3")
        this.$messenger.sounds.call.loop = true
        // Configure Echo
        this.$echo.options.broadcaster = this.$echo.config.broadcaster
        await this.$echo.connect()
        dispatch("heartbeat")
        // Add Echo events
        dispatch("events")

        commit("init", true)
    },

    async events({state, commit, dispatch, rootState}, id) {
        this.$echo
            .private("messenger.user." + this.$auth.user.id)
            .listen(".new.message", (message) => {
                dispatch("messenger/thread/messages/incoming", message, {root: true})
            })
            .listen(".message.archived", (e) => {
                commit("messenger/thread/messages/remove", e, {root: true})
            })
            .listen(".reaction.added", (e) => {
                if (e.message.meta.thread_id === this.$messenger.activeThreadId())
                    return
                this.$toast.info(`${e.owner.name} reacted to ur message`)
            })
            .listen(".reaction.removed", (e) => {
                if (e.message.meta.thread_id === this.$messenger.activeThreadId())
                    return
                this.$toast.info(`${e.owner.name} removed his reaction to ur message`)
            })
            .listen(".knock.knock", (e) => {
                dispatch("messenger/knocks/incoming", e, {root: true})
            })
            .listen(".new.thread", (e) => {
                dispatch("messenger/threads/add", e.thread.id, {root: true})
                this.$messenger.sounds.message.play()
            })
            .listen(".friend.approved", (e) => {
                this.$toast.success(
                    `${e.recipient.name} approved  your friend request!`
                )
            })
            .listen(".friend.denied", (e) => {
                this.$toast.error(`Your friend request was denied!`)
            })
            .listen(".friend.request", (e) => {
                this.$toast.success(`${e.sender.name} sent you a friend request !`)
                // dispatch("heartbeat");
            })

            .listen(".avatar.downloaded", ({avatar}) => {
                this.$auth.user.avatar = avatar
                commit("avatarDownloading", false)
            })
            .listen(".avatar.downloading", () => {
                commit("avatarDownloading", true)
            })

            .listen(".thread.approval", (e) => {
                this.$toast.success(`${e.sender.name} approved your conversation !`)

                if (this.$messenger.activeThreadId() === e.thread.id)
                    dispatch("messenger/activeThread/update", e.thread.id, {
                        root: true
                    })
            })
            // .listen(".permissions.updated", e => {
            //   console.log(e);
            // })

            .listen(".thread.left", (e) => {
            })

            .listen(".thread.archived", (e) => {
                commit("messenger/threads/remove", e.thread_id, {root: true})
                this.$toast.error("The conversation was deleted")
            })

            .listen(".incoming.call", (e) => {
                console.log("%cCall  Incoming ", "color: blue")

                // console.log(e);
                // window.callSound.play();
                commit("messenger/thread/call/incomingCall", e, {root: true})
            })
            .listen(".left.call", (e) => {
                console.log("%cCall  Left ", "color: blue")
            })
            .listen(".joined.call", (e) => {
                console.log("%cCall  Joined ", "color: blue")

                if (e?.call?.thread?.type === 1 && e.sender) {
                    dispatch(
                        "messenger/thread/call/privateCallJoined",
                        {thread_id: e.call.thread_id, call_id: e.call.id},
                        {root: true}
                    )
                }
            })
            .listen(".call.ignored", ({thread_id, id, thread_type}) => {
                console.log("%cCall  Ignored ", "color: blue")

                if (thread_type === 1 && rootState.messenger.thread.call.isCaller)
                    dispatch(
                        "messenger/thread/call/end",
                        {thread_id, call_id: id},
                        {root: true}
                    )
            })
            .listen(".call.ended", (e) => {
                console.log("%cCall  Ended ", "color: blue")

                this.$toast.info("Call was ended !")
                commit("messenger/thread/call/reset", null, {root: true})
            })
        // .listen(".joined.call", () => commit("calling", false, { root: true }));
    },
    async heartbeat({state, commit, rootState}) {
        if (state.heartbeat) clearInterval(state.heartbeat)

        if (!rootState.auth.loggedIn) return

        commit("away", rootState.idleVue.isIdle)

        await this.$axios
            .$post(`/messenger/heartbeat`, {
                away: state.away
            })
            .catch((e) => clearInterval(state.heartbeat))

        state.heartbeat = setInterval(async () => {
            if (!rootState.auth.loggedIn) return clearInterval(state.heartbeat)
            commit("away", rootState.idleVue.isIdle)
            state.heartbeat = await this.$axios
                .$post(`/messenger/heartbeat`, {
                    away: state.away
                })
                .catch((e) => clearInterval(state.heartbeat))
        }, 60000)
    }
}
