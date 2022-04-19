<template>
  <div
      id="thread-box"
      class="tw-py-4  tw-relative tw-px-8 smd:tw-px-4 tw-flex-1 tw-overflow-y-scroll tw-overflow-x-hidden
      tw-scrollbar
       tw-scrollbar-track-background-400
tw-scrollbar-thumb-gray-300
         dark:tw-scrollbar-thumb-neutral-800
          tw-scrollbar-thin"
      @scroll="onScroll"

      @dragover.prevent="$store.commit('messenger/thread/uploads/dropzone', true)"
  >
    <!--    <MessengerBaseImageEditor v-if="$store.state.messenger.uploads.fileEditor"/>-->
    <MessengerBaseDropZone v-if="$store.state.messenger.thread.uploads.dropzone"/>

    <div v-if="loaded" class="tw-flex-center tw-text-sm  tw-text-skin-secondary tw-mt-5 tw-mb-8  tw-inset-x-0">
      Start of conversation
    </div>
    <div v-if="loading" class="tw-flex-center tw-absolute  tw-inset-x-0">
      <MessengerBaseLoader class="tw-text-sm tw-text-skin-base"/>
    </div>

    <MessengerThreadMessages :messages="messages" @more="moreItemsRendered"/>
    <MessengerThreadContentPendingBox
        v-if="$store.state.messenger.activeThread.permissions.awaiting_my_approval&&showPendingBox"/>

  </div>


</template>
<script>
export default {
  data() {
    return {
      threadBox: null,
      lastScrollHeight: null,
      showPendingBox: false
    }
  },
  updated() {
    this.$nextTick(() => {

      this.showPendingBox = true
      // Code that will run only after the
      // entire view has been re-rendered
    })
  },
  computed: {


    messages() {
      return this.$store.state.messenger.thread.messages.list
    },
    loading() {
      return this.$store.state.messenger.thread.messages.loading
    },
    loaded() {
      return this.$store.state.messenger.thread.messages.loaded
    }
  },

  methods: {
    moreItemsRendered() {
      this.threadBox.scrollTop = this.threadBox.scrollHeight - this.lastScrollHeight + 5

    },
    style(owner) {
      const index = this.$_.findIndex(
          this.$store.state.messenger.thread.participants.list,
          el => el.owner.provider_id === owner.provider_id
      )

      if (index !== -1) {
        return {color: this.$store.state.messenger.thread.participants.list[index].color}
      }
      return ""

    },
    async onScroll({target: {scrollTop, scrollHeight, clientHeight}}) {
      if (!this.$store.state.messenger.activeThread.show) return
      this.$store.state.messenger.activeThread.distanceFromBottom = scrollHeight - scrollTop - clientHeight
      if (scrollTop === 0)
        if (!this.loading && !this.loaded) {
          this.threadBox = document.getElementById("thread-box")

          // get scroll height to maintain scroll position
          this.lastScrollHeight = this.threadBox.scrollHeight


          await this.$store.dispatch('messenger/thread/messages/more')

        }
    }
  }
}
</script>
<style>

#thread-box::-webkit-scrollbar-track {
  -webkit-box-shadow: none;

}

/* Handle */
#thread-box::-webkit-scrollbar-thumb {

  -webkit-box-shadow: none;
}


</style>
