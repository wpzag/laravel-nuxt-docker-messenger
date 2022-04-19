<template>
  <div class="tw-fixed tw-inset-0 tw-bg-black/10 tw-flex-center tw-z-50">

    <div class="tw-p-10 tw-bg-skin-background-200 tw-rounded-lg tw-w-[54rem] smd:tw-w-[80%] ">

      <v-textarea v-model="body" label="Message" outlined/>
      <div class="tw-flex tw-justify-end">
        <v-btn color="error" text
               @click="close"
        >
          Cancel
        </v-btn>
        <v-btn :loading="loading" color="primary" elevation="0" @click="update">
          Update
        </v-btn>
      </div>


    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      loading: false,
      message: null,
      body: null
    }
  }, mounted() {
    this.message = this.$store.state.messenger.dialogs.editMessage.message
    this.body = this.message.body
  },
  methods: {
    async update() {
      this.loading = true
      const message = await this.$api.messenger.messages.edit(this.message.thread_id, this.message.id, this.body)
      const msg = this.$messenger.message.find(
          message.id,
          this.$store.state.messenger.thread.messages.list
      )
      if (!msg) return

      const {groupIndex, messageIndex} = msg
      message.type = this.$messenger.message.getType(message)
      this.$store.commit('messenger/thread/messages/update', {message, groupIndex, messageIndex})
      this.close()
      this.loading = false

    }, close() {
      this.$store.commit('messenger/dialogs/editMessage', {message: null, show: false})
    }
  }


}
</script>
