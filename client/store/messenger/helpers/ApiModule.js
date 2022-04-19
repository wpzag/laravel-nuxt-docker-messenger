export default class {
    constructor(endpoint) {
        this.state = {
            list: [],
            next_page_route: null,
            loaded: false,
            loading: false
        }
        this.getters = {
            list: (state) => state.list,
            meta: (state) => state.meta,
            loading: (state) => state.loading,
            loaded: (state) => state.loaded
        }
        this.actions = {
            async fetch({state, commit, rootGetters}, init = false) {
                if (endpoint.includes("{thread}")) {
                    endpoint = endpoint.replace(
                        "{thread}",
                        this.$messenger.activeThreadId()
                    )
                }
  
                if (init) {
                    state.loading = false
                    state.loaded = false
                }
                if (state.loading || state.loaded)
                    // if loaded all records
                    return

                // if initial fetch
                if (!state.next_route) commit("resetApi")

                // start loading
                commit("loading", true)

                // fetch data
                const {data, meta} = await this.$axios.$get(
                    state.next_route === null || init ? endpoint : state.next_route
                )

                // set meta
                commit("setMeta", meta)

                // set data
                commit("setList", data)

                // stop loading
                commit("loading", false)
            }
        }
        this.mutations = {
            resetApi(state) {
                state.list = []
                state.next_route = null
                state.loaded = false
                state.loading = false
            },
            setMeta(state, {final_page, next_page_route}) {
                state.loaded = final_page
                state.next_route = next_page_route
            },
            setList(state, threads) {
                state.list = [...state.list, ...threads]
            },
            loading(state, payload) {
                state.loading = payload
            }
        }
    }
}
