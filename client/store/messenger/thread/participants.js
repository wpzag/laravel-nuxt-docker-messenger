export const state = () => ({
    list: [],
    next_page_route: null,
    loaded: false,
    loading: false,

    selected: null,
    auth_id: null,
    privateStatus: {status: 0, text: "offline"},
    activeList: [],
    typingList: [],
    heartbeat: null
})
export const getters = {
    show: (state) => state.show
}
// mutations
export const mutations = {
    resetApi(state) {
        state.list = []
        state.next_route = null
        state.loaded = false
        state.loading = false
    },
    setList(state, list) {
        state.list = list.map((e) => {
            let status = e.owner.options.online_status
            e.priorty = {
                0: 3,
                2: 2,
                1: 1
            }[status]

            return e
        })
    },
    setMeta(state, {final_page, next_page_route}) {
        state.loaded = final_page
        state.next_route = next_page_route
    },
    loading(state, payload) {
        state.loading = payload
    },
    addActive(state, user) {
        if (user.provider_id === this.$auth.user.id) return

        if (
            !this.$_.find(state.activeList, (el) => el.owner_id === user.provider_id)
        ) {
            // console.log("adding");
            user = this.$_.find(state.list, (el) => el.owner_id === user.provider_id)
            state.activeList.push(user)
        }
    },
    removeActive(state, id) {
        state.activeList = this.$_.remove(
            state.activeList,
            (el) => el.owner.provider_id === id
        )
    },
    addTyping(state, {user, startTime}) {
        state.typingList.push({
            value: user,
            time: startTime
        })
    },
    updateTyping(state, {index, user, startTime}) {
        state.typingList[index].startTime = startTime
    },
    removeTyping(state, user) {
        const index = this.$_.findIndex(
            state.typingList,
            (el) => el.value.provider_id === user.provider_id
        )
        if (index !== -1) {
            clearInterval(state.typingList[index].int)
        }
        state.typingList = state.typingList.filter(
            (el) => el.value.provider_id !== user.provider_id
        )
    },
    updateParticipant(state, payload) {
        const index = this.$_.findIndex(state.list, ["id", payload.id])
        state.list[index] = payload
    },
    removeParticipant(state, id) {
        this.$_.remove(state.list, (el) => el.id === id)
    },
    add(state, payload) {
        state.list = [...state.list, ...payload]
    },
    selected(state, selected) {
        state.selected = selected
    },
    setPrivateStatus(state, user) {
        // if (!user?.options?.online_status) return;
        const status = user.owner.options.online_status
        if (status === 1)
            return (state.privateStatus = {status: 1, text: "online"})
        if (status === 2)
            return (state.privateStatus = {status: 2, text: "away"})

        const last_active = user.owner.options.last_active
        const lastSeen = last_active
            ? "last seen, " + this.$moment(last_active).fromNow()
            : "offline"
        state.privateStatus = {
            status: 0,
            text: lastSeen
        }
    },
    reset(state) {
        state.selected = null
        state.auth_id = null
        state.list = []
        state.next_page_route = []
        state.loaded = false
        state.loading = false
        state.activeList = []
        state.typingList = []
        clearInterval(state.heartbeat)
        state.heartbeat = null
    }
}

export const actions = {
    async fetch({state, commit}) {
        if (state.loading) return

        // start loading

        commit("loading", true)

        // fetch data
        const {data, meta} = await this.$api.messenger.participants.index()

        // set meta
        commit("setMeta", meta)

        // set data
        commit("setList", data)

        // stop loading
        commit("loading", false)
    },
    init({dispatch, state, commit, getters}, {participants}) {
        commit("setList", participants.data)

        state.meta = participants.meta
        commit(
            "setPrivateStatus",
            state.list?.filter(({owner_id}) => owner_id !== this.$auth.user.id)[0]
        )
        dispatch("heartbeat")
    },
    typing({state, commit}, user) {
        if (!user.typing) return commit("removeTyping", user)
        const index = this.$_.findIndex(
            state.typingList,
            (el) => el.value.provider_id === user.provider_id
        )
        if (index !== -1) {
            const startTime = Date.now()
            return commit("updateTyping", {index, user, startTime})
        }

        const startTime = Date.now()
        commit("addTyping", {user, startTime})
        const userIndex = this.$_.clone(state.typingList.length - 1)

        state.typingList[userIndex].int = setInterval(() => {
            const time = Date.now()
            if (time > state.typingList[userIndex].startTime + 3000) {
                commit("removeTyping", user)
            }
        }, 500)
    },

    heartbeat({state, commit, dispatch, rootState}) {
        if (!rootState.auth.loggedIn) return clearInterval(state.heartbeat)
        state.heartbeat = setInterval(async () => {
            if (!rootState.auth.loggedIn) return clearInterval(state.heartbeat)

            await dispatch("fetch")

            if (this.$messenger.activeThread().type === 1) {
                commit(
                    "setPrivateStatus",
                    state.list?.filter(
                        ({owner_id}) => owner_id !== this.$auth.user.id
                    )[0]
                )
            }
        }, 60000)
    }
}
