<template>
  <div class="tw-fixed tw-inset-0 tw-bg-black/10 tw-flex-center  tw-z-50">
    <div
        v-click-outside="()=>close()"
        class="tw-p-10 tw-bg-skin-background-200 tw-rounded-lg tw-flex-center tw-flex-col tw-w-[30rem] smd:tw-w-[80%] ">
      <div class="tw-font-bold tw-mb-4">Message Edits History</div>
      <div v-if="!$fetchState.pending"
      >

        <ul class="tw-text-left">
          <li v-for="edit in edits">
            {{ edit.body }} -
            <span class="tw-left-2" style="opacity: 0.4">{{
                formatEditedAt(edit)
              }}</span>
          </li>
        </ul>


      </div>
      <MessengerBaseLoader v-else/>
    </div>

  </div>

</template>
<script>
export default {
  data() {
    return {
      edits: []
    }
  },
  async fetch() {
    this.edits = await this.$axios.$get(
        `/messenger/threads/${this.message.thread_id}/messages/${this.message.id}/history`
    )

  },
  computed: {
    message() {
      return this.$store.state.messenger.dialogs.messageEdits.message
    }
  },
  methods: {
    formatEditedAt(edit) {
      return this.$moment(edit.edited_at).format('YYYY.DD.MM  - H:mm A')
    },
    close() {
      this.$store.commit('messenger/dialogs/messageEdits', {show: false, message: null})
    }
  }
}
</script>


</script>
