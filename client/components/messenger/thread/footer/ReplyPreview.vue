<template>
  <div
      class="tw-absolute tw-overflow-hidden tw-inset-x-0 tw-bottom-[104%]  tw-bg-gray-200 dark:tw-bg-skin-background-400 tw-rounded-xl  tw-p-5 tw-flex tw-justify-between tw-items-center ">
    <div class="tw-flex tw-space-x-4 tw-items-center  tw-truncate">

      <MessengerBaseIcon class="tw-flex-shrink-0" name="reply" size="5"></MessengerBaseIcon>
      <div class="tw-truncate">
        <div>Replying to {{ name }}</div>
        <div v-if=" $store.state.messenger.thread.messages.reply_to.type === 'text'"
             class="tw-opacity-40 tw-truncate "
             v-html="$messenger.message.parse($store.state.messenger.thread.messages.reply_to)"></div>
      </div>

    </div>
    <a
        class="tw-cursor-pointer tw-flex-shrink-0 tw-text-white tw-bg-gray-400 dark:tw-bg-skin-background-400  tw-hover-scale-md tw-p-2  tw-rounded-full"
        @click="$store.commit('messenger/thread/messages/reply_to',null)"
    >

      <MessengerBaseIcon name="close" size="3"/>
    </a>

  </div>
</template>
<script>
export default {
  computed: {
    name() {
      return this.$store.state.messenger.thread.messages.reply_to.owner.name
    }

  }, mounted() {
    let input = document.getElementById('messenger-footer-input')
    input.focus()
  }
}
</script>
