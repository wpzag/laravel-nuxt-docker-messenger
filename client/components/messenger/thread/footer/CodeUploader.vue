<template>
  <div class="tw-dark">
    <div
        v-if="$store.state.messenger.thread.uploads.codeEditor"
        class="tw-fixed-overlay-full tw-bg-black/20"
    ></div>
    <v-slide-y-reverse-transition>
      <div
          v-if="$store.state.messenger.thread.uploads.codeEditor"
          v-click-outside="() => $store.commit('messenger/thread/uploads/codeEditor', false)"
          class="tw-bg-skin-background-200 tw-p-4 tw-rounded-xl tw-overflow-hidden tw-fixed tw-inset-center tw-z-40 tw-h-3/4 tw-w-2/4 tw-flex tw-flex-col tw-space-y-2 tw-items-end"
          @click="clicked"
      >
        <MessengerBaseCodeEditor
            id="code-editor-dialog"
            :value="code"
            class="my-editor tw-rounded-xl tw-bg-skin-background-800"
            @input="code=$event"
        />
        <MessengerBaseBtn
            class="tw-bg-skin-primary tw-px-4 tw-py-5"
            @click="send"
        >
          Send
        </MessengerBaseBtn>
      </div>
    </v-slide-y-reverse-transition>
  </div>
</template>

<script>

export default {
  data() {
    return {
      code: ''
    }
  },


  methods: {

    clicked() {
      document
          .querySelector("#code-editor-dialog .prism-editor__textarea")
          .focus()
    }, send() {
      this.$store.dispatch('messenger/thread/uploads/uploadCode', this.code)
      this.code = ''
    }
  }
}
</script>
