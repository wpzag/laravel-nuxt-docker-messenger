<template>
  <div class="tw-flex-center tw-flex-col">

    <div> Do you want to approve this conversation ?</div>
    <div>
      <span class="caption"
      >After approval you will be able to send messages!</span
      ></div
    >
    <div>
      <v-btn color="error" text>Block</v-btn>

      <v-btn :loading="loading" color="primary" text @click="approve"
      >Approve
      </v-btn
      >
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      loading: false
    }
  },

  methods: {
    async approve() {
      this.loading = true
      await this.$api.messenger.thread.approve({
        approve: true
      })

      // const { data } = await axios.get(
      //   `/api/messenger/threads/${this.thread.id}`
      // );

      await this.$store.dispatch("messenger/activeThread/update", this.$messenger.activeThreadId())
      this.loading = false
    }
  }
}
</script>
