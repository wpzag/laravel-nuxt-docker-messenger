<template>
  <div class="tw-fixed-overlay-full tw-flex-center">
    <div class="tw-bg-skin-primary tw-p-10 tw-px-14 tw-rounded  tw-space-y-3 tw-flex-center tw-flex-col">
      <MessengerBaseAvatar :src="call.sender.avatar.sm" size="7"/>
      <h3 class="tw-font-bold">
        {{ call.sender.name }}
      </h3>
      <div class="tw-mb-6">Calling...</div>

      <div class="tw-space-x-3">
        <MessengerBaseIconButton bgColor="tw-bg-red-500" icon="close" name="Decline" padding="tw-p-5"
                                 size="5"
                                 textColor="tw-text-white"
                                 @click="end"/>
        <MessengerBaseIconButton bgColor="tw-bg-green-500" icon="call" name="Answer" padding="tw-p-5"
                                 size="5"
                                 textColor="tw-text-white"
                                 @click="join"
        />

      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ['call'],
  mounted() {
  },
  methods: {
    join() {
      this.$store.dispatch('messenger/thread/call/join', {
        call_id: this.call.call.id,
        thread_id: this.call.call.thread_id
      })
    },
    end() {
      if (this.call.call.thread_type === 1) {
        this.$store.dispatch('messenger/thread/call/ignore', {
          call_id: this.call.call.id,
          thread_id: this.call.call.thread_id
        })
      } else {
        // this.$store.dispatch('messenger/thread/call/leave', {
        //   call_id: this.call.call.id,
        //   thread_id: this.call.call.thread_id
        // })
        // this.$store.commit('messenger/thread/call/incomingCall', null)
      }
    }
  }
}
</script>
