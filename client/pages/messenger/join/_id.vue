<template>
  <div class="tw-text-white tw-fixed tw-inset-0 tw-bg-gray-800 tw-flex-center">
    <div
        v-if="!$fetchState.pending   "
    >
      <div v-if="!$fetchState.error && invitation.options.is_valid "
           class="tw-space-y-5 tw-flex-center tw-flex-col"
      >
        <MessengerBaseAvatar :src="invitation.options.avatar.sm" size="5"></MessengerBaseAvatar>

        <div class="tw-font-bold">
          {{ invitation.options.thread_name }}
        </div>
        <div class="tw-text-sm">

          {{
            invitation.options.in_thread
                ? 'You are already in this group.'
                : 'Select an option below. Once joined, you will be redirected into the group.'
          }}

        </div>
        <div v-if="!invitation.options.in_thread" class="mt-5">
          <MessengerBaseBtn bgColor="tw-bg-red-500" size="lg" @click="$messenger.to(`threads`)">
            No
          </MessengerBaseBtn>

          <MessengerBaseBtn :loading="loading" size="lg" @click="join">Join</MessengerBaseBtn>
        </div>
        <div v-else class="mt-5">
          <MessengerBaseBtn bgColor="tw-bg-green-500" size="lg"
                            @click="$messenger.to(`threads.${invitation.thread_id}`)">Enter
          </MessengerBaseBtn>

        </div>
      </div>
      <div v-else class="tw-flex-center tw-flex-col">
        <div class="tw-text-gray-500 tw-font-bold tw-text-2xl">Invalid Invite.</div>
        <div class="tw-text-gray-500">The invite you requested is expired or not found.</div>
      </div>
    </div>
    <div v-else>
      <MessengerBaseLoader class="tw-text-white"/>

    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      loading: false,
      invitation: null
    }
  },
  async fetch() {
    this.invitation = await this.$api.messenger.invitations.show(this.$route.params.id)
    if (!this.invitation.options.messenger_auth) await this.$router.push('/login')
  },

  methods: {

    async join() {
      this.loading = true
      await this.$api.messenger.invitations.join(this.$route.params.id)
      this.$messenger.to(`threads.${this.invitation.thread_id}`)
      this.loading = true
    }

  }
}
</script>
