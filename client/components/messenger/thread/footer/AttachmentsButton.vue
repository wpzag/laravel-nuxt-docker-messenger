<template>
  <div
      :class="attachmentsActive? 'tw-space-x-2 tw-w-28':'tw-w-12 '  "
      class="tw-flex tw-items-center tw-transition-defaults"
  >

    <MessengerThreadFooterButton
        :class="[{
        'tw-transform tw-rotate-45 tw-transition-defaults ': attachmentsActive,
      }, attachmentsActive
          ? 'tw-text-red-500 hover:tw-text-red-500/80'
          : 'tw-text-skin-primary hover:tw-text-skin-primary-500/80']"

        icon="plus-rounded"
        @click="
        $store.commit('messenger/thread/footer/attachmentsActive', !attachmentsActive)
      "
    />
    <v-fade-transition>
      <div v-if="attachmentsActive" class="tw-space-x-2 tw-flex">
        <MessengerThreadFooterImageUploader/>
        <MessengerThreadFooterFileUploader/>
        <MessengerThreadFooterButton
            v-tippy
            class="tw-text-skin-primary hover:tw-text-skin-primary-500/80"
            content="Upload Code"
            icon="code"
            name="Code"
            @click="$store.commit('messenger/thread/uploads/codeEditor', true)"
        />
      </div>
    </v-fade-transition>
    <MessengerThreadFooterGifPicker class="tw-ml-2"/>

  </div>
</template>
<script>
export default {
  computed: {
    attachmentsActive() {
      return this.$store.state.messenger.thread.footer.attachmentsActive
    },
    audioRecorder() {
      return this.$store.state.messenger.thread.uploads.audioRecorder
    }
  }
}
</script>
