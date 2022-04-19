<template>
  <div @click="clicked"
  >
    <MessengerThreadSettingMainListItem
        v-bind="item"
    />
  </div>

</template>
<script>

export default {
  data() {
    return {
      loading: false
    }
  },

  computed: {
    item() {
      return {
        name: this.isGroup ? "Leave Chat" : 'Delete Chat',
        icon: this.isGroup ? "logout" : 'trash',
        textColor: "tw-text-red-500",
        bgColor: "tw-bg-red-500/10",
        desc: this.isGroup ? "Leave this group" : "Delete this Conversation "
      }
    }, isGroup() {
      return this.$store.state.messenger.activeThread.thread?.type === 2
    }

  }, methods: {

    async clicked() {

      const id = this.$messenger.activeThreadId()
      const message = this.type === 2 ? 'Are you sure you want to leave this group' : 'Are you sure you want to delete this conversation?'

      await this.$messenger.confirmAlert(message,
          () => this.loading = true,
          () => this.isGroup ? this.$api.messenger.thread.leave() : this.$api.messenger.thread.delete(),
          () => {
            this.$store.commit('messenger/threads/remove', id)
            this.$messenger.to('threads')
            this.$store.dispatch('messenger/activeThread/resetAll')
            this.loading = false
          },
          () => this.loading = false
      )

    }


  }
}
</script>
