export const state = () => ({
    expanded: false,
    list: [],
    unlisted: [],
    total: null,
    next_route: null,
    loaded: false,
    loading: false,
    type: "images",
    menu: ["images", "videos", "documents", "audio"]
})

export const mutations = {
    reset(state) {
        state.list = []
        state.unlisted = []
        state.next_route = null
        state.total = null

        state.loaded = false
        state.loading = false
        state.expanded = false
    },
    type(state, payload) {
        state.type = payload
    },
    setMeta(state, {final_page, next_page_route, total}) {
        state.loaded = final_page
        state.total = total
        state.next_route = next_page_route
    },
    setList(state, payload) {
        state.list = [...state.list, ...payload]
    },
    loading(state, payload) {
        state.loading = payload
    },
    expanded(state, payload) {
        state.expanded = payload
    }
}
export const actions = {
    async fetch({state, commit}, {type}) {
        console.log(type)
        // if (state.loaded || state.loading) return
        commit("reset")

        // start loading
        commit("loading", true)
        // fetch data
        const {data, meta} = await this.$api.messenger.thread.loadFiles(type)

        // set meta
        commit("setMeta", meta)

        let fromIndex = ["images", "videos"].includes(state.type) ? 6 : 3

        state.unlisted = data.slice(fromIndex, data.length)

        // set data
        commit("setList", data.slice(0, fromIndex))

        // stop loading
        commit("loading", false)
    },
    async more({state, commit}) {
        if (state.loaded && state.unlisted.length) {
            commit("expanded", true)
            commit("loading", true)

            setTimeout(() => {
                commit("setList", state.unlisted)
                commit("loading", false)

                state.unlisted = []
            }, 300)
            return
        }

        commit("expanded", true)
        // if still loading or loaded all records
        if (state.loading || state.loaded) return

        // start loading
        commit("loading", true)
        // fetch data
        const {data, meta} = await this.$api.messenger.base.load(
            state.next_route
        )

        // set meta
        commit("setMeta", meta)

        // set data
        commit("setList", [...state.unlisted, ...data])
        state.unlisted = []

        // stop loading
        commit("loading", false)
    },
    async shrink({state, commit}) {
        let list = state.list
        let fromIndex = ["images", "videos"].includes(state.type) ? 6 : 3
        state.list = list.slice(0, fromIndex)
        state.unlisted = list.slice(fromIndex, list.length)

        commit("expanded", false)
    }
}
