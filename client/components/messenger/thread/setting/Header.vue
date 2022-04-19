<template>
  <div class="tw-flex tw-flex-col tw-items-center">
    <MessengerBaseAvatar
        :size="5"
        :src="$store.state.messenger.activeThread.thread.avatar.md"
        square
    />

    <div class="tw-mt-5">{{ $store.state.messenger.activeThread.thread.name }}</div>
    <div v-if="$store.state.messenger.activeThread.thread.type===1" class="tw-text-skin-secondary tw-text-xs">

      {{ $store.state.messenger.thread.participants.privateStatus.text }}


    </div>
    <div class="tw-flex tw-space-x-4 tw-mt-5">
      <MessengerThreadSettingMainHeaderIcon
          v-for="{ name, icon, colors ,visible,handler,isLoading } in items"
          v-if="visible"
          :key="name"
          v-bind="{ name, icon, colors,isLoading }"
          @click="submit(handler)"
      />

    </div>
  </div>
</template>
<script>
export default {

  data() {
    return {
      muteLoading: false
    }
  },

  computed: {
    items() {
      return [
        {
          name: "Call",
          handler: "call",
          icon: "call",
          colors: "tw-text-white tw-bg-green-500 hover:tw-ring-green-500",
          visible: this.$store.state.messenger.activeThread.permissions.call
        },
        {
          name: "Add member",
          handler: "addParticipant",

          icon: "user-add",
          colors:
              "tw-text-white tw-bg-skin-primary/80  hover:tw-ring-skin-primary/80 ",
          visible: this.$store.state.messenger.activeThread.permissions.add_participants

        },
        {
          name: this.$store.state.messenger.activeThread.permissions.muted ? "Unmute Chat" : "Mute Chat",
          handler: "mute",
          isLoading: this.muteLoading,
          icon: this.$store.state.messenger.activeThread.permissions.muted ? "bell-off" : "bell",

          colors:
              " tw-bg-gray-100 dark:tw-bg-skin-background-800 tw-text-gray-400 dark:hover:tw-ring-gray-700  hover:tw-ring-gray-100/80 ",
          visible: true
        }

      ]
    }
  }, methods: {
    submit(handler) {
      this[handler]()
    },
    addParticipant() {
      this.$store.commit('messenger/dialogs/addParticipant', {show: true})
    }, async mute() {
      this.muteLoading = true
      await this.$store.dispatch('messenger/activeThread/mute')
      this.muteLoading = false


    }
  }
}
</script>
