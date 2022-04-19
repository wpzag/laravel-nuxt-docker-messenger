<template>
  <div
      class="tw-fixed tw-bg-black/30 tw-inset-0 tw-h-screen tw-flex-center tw-z-40"
  >
    <div class="tw-min-w-[24rem]  tw-bg-skin-background-400 tw-rounded-2xl tw-overflow-hidden">
      <div
          class=" tw-bg-gray-200 dark:tw-bg-skin-background-200 tw-px-5 tw-py-8  tw-flex tw-justify-between tw-items-center tw-w-full tw-h-4">
        <div>Upload File</div>
        <MessengerBaseIconButton class="  tw-text-white tw-bg-gray-600 "
                                 icon="close" name="close" size="3"
                                 @click="$store.commit('messenger/thread/uploads/reset')"/>

      </div>

      <div
          class="tw-flex tw-relative tw-px-5 tw-py-6 tw-justify-between tw-items-center   tw-p-3  "
      >
        <div class="tw-mr-4 tw-flex-center tw-space-x-3">
          <MessengerBaseIcon class="tw-text-skin-secondary" name="file" size="10"/>
          <div>
            <div class="tw-truncate tw-max-w-[14rem]">{{ $store.state.messenger.thread.uploads.fileName }}</div>
            <div class="tw-text-skin-secondary">{{ $store.state.messenger.thread.uploads.fileSize }}</div>
          </div>

        </div>
        <div>
          <MessengerBaseIconButton class="tw-bg-skin-primary tw-text-white tw-rounded"
                                   icon="send" name="send" size="6"
                                   @click="$store.dispatch('messenger/thread/uploads/uploadFile')"/>
          <!--        tw&#45;&#45;right-3 tw&#45;&#45;top-3-->
        </div>


      </div>
    </div>


  </div>
</template>
<script>

export default {


  methods: {

    close() {
      // this.loaded = false
      this.$emit("closed")

    }
  }
}
</script>
