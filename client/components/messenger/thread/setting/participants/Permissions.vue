<template>
  <div class="tw-flex tw-space-x-3 tw-mt-2">
    <template v-for="item in items">
      <MessengerBaseIcon
          v-if="item.show"
          :key="item.icon + item.color"
          :class="item.color"
          :name="item.icon"
          size="4"
      />
    </template>
  </div>
</template>
<script>

export default {
  props: ["participant"],
  data() {
    return {
      items: [
        {
          name: "Send Messages",
          icon: "chat",
          color: "tw-text-blue-500",
          show: this.participant.send_messages
        },
        {
          name: "Start voice chat",
          icon: "video-camera",
          color: "tw-text-purple-500",
          show: this.participant.start_calls
        },
        {
          name: "Manage invitation links",
          icon: "link",
          color: "text-rose-400",
          show: this.participant.manage_invites
        },
        {
          name: "Add members",
          icon: "user-add",
          color: "tw-text-pink-500",
          show: this.participant.add_participants
        },
        {
          name: "Manage bots",
          icon: "bot",
          color: "tw-text-green-600",
          show: this.participant.manage_bots
        },
        {
          name: "Send knocks",
          icon: "knock",
          color: "tw-text-indigo-600",
          show: this.participant.send_knocks
        }
      ]
    }
  }
}
</script>
