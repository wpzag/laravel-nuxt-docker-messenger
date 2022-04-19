export const state = () => ({
    threadEcho: null
})
export const actions = {
    init({commit, dispatch, rootState, state}, {id, prev_thread_id}) {
        for (let k in this.$echo.connector.channels) {
            if (k.includes("presence-messenger")) this.$echo.leave(k)
        }

        state.threadEcho = this.$echo.join("messenger.thread." + id)

        state.threadEcho
            .here((users) => {
                // console.log(users);
                for (let user of users) {
                    commit("messenger/thread/participants/addActive", user, {
                        root: true
                    })
                }
            })
            .joining((user) => {
                commit("messenger/thread/participants/addActive", user, {root: true})
                // dispatch(
                //     'messages/updateMessagesReaders',
                //     messages[messages.length - 1],
                //     { root: true }
                // )
            })
            .leaving((user) => {
                commit("messenger/thread/participants/removeActive", user, {
                    root: true
                })
            })
            .listen(".reaction.added", (e) => {
                console.log(e)
                dispatch("messenger/thread/message/reactions/add", e, {root: true})
            })
            .listen(".reaction.removed", (e) =>
                dispatch("messenger/thread/message/reactions/remove", e, {root: true})
            )
            .listenForWhisper("typing", (e) => {
                // console.log(e);
                dispatch("messenger/thread/participants/typing", e, {root: true})
            })
    }
}
