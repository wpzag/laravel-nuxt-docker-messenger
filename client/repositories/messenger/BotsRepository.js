export default ({$axios, $messenger}) => ({
    getPackages() {
        return $axios.$get(
            `/messenger/threads/${$messenger.activeThreadId()}/bots/packages`
        )
    },
    installPackage(alias) {
        return $axios.$post(
            `/messenger/threads/${$messenger.activeThreadId()}/bots/packages`,
            {alias}
        )
    },
    index() {
        return $axios.$get(
            `/messenger/threads/${$messenger.activeThreadId()}/bots`
        )
    },
    find(id) {
        return $axios.$get(
            `/messenger/threads/${$messenger.activeThreadId()}/bots/${id}`
        )
    }, destroy(id) {
        return $axios.$delete(
            `/messenger/threads/${$messenger.activeThreadId()}/bots/${id}`
        )
    },
    addHandlers(id) {
        return $axios.$get(
            `/messenger/threads/${$messenger.activeThreadId()}/bots/${id}/add-handlers`
        )
    },
    storeAction(id, form) {
        return form.post(
            `/messenger/threads/${$messenger.activeThreadId()}/bots/${id}/actions`
        )
    },
    updateAction(botId, actionId, form) {
        return form.put(
            `/messenger/threads/${$messenger.activeThreadId()}/bots/${botId}/actions/${actionId}`
        )
    },
    getAction(botId, actionId) {
        return $axios.$get(
            `/messenger/threads/${$messenger.activeThreadId()}/bots/${botId}/actions/${actionId}`
        )
    },
    deleteAction(botId, actionId) {
        return $axios.$delete(
            `/messenger/threads/${$messenger.activeThreadId()}/bots/${botId}/actions/${actionId}`
        )
    }
});
