<template>
  <div

      class="tw-max-h-full  tw-bg-skin-background-200 tw-z-30 tw-w-96
        ssm:tw-inset-0
        tw-max-w-full
        tw-rounded-xl
         ssm:tw-rounded-none
         ssm:tw-w-screen
          tw-mr-5 tw-p-10 tw-fixed tw-right-0 tw-top-5 tw-bottom-5 tw-overflow-y-auto tw-scrollbar-none"
      @scroll="onScroll"
  >
    <template v-if="!$store.state.messenger.activeThread.loading && $store.state.messenger.activeThread.thread">
      <MessengerThreadSettingHeader

          class="tw-relative tw-b order-b tw-border-dashed tw-border-skin-border tw-pb-10"
      />
      <div class="tw-absolute tw-top-10 tw-left-10 tw-hidden ssm:tw-block">
        <MessengerBaseIconButton bgColor="tw-bg-black" class="tw-p-2" icon="close" size="5"
                                 @click="$messenger.to('threads.current')"/>

      </div>
      <NuxtChild/>
    </template>
    <div v-else class="tw-w-full tw-h-full tw-flex-center">

      <MessengerBaseLoader class="tw-text-sm tw-text-black"/>
    </div>

  </div>
</template>
<script>
export default {
  transition: 'setting',

  methods: {
    onScroll({target: {scrollTop, clientHeight, scrollHeight}}) {

      if (!this.$store.state.messenger.thread.filesWidget.expanded) return
      if (scrollTop + clientHeight >= scrollHeight) {
        if (this.$store.state.messenger.thread.filesWidget.expanded) {
          this.$store.dispatch("messenger/thread/filesWidget/more")

        }
        if (this.$route.fullPath.endsWith('settings/participants')) {
          this.$store.dispatch("messenger/thread/participants/fetch")
        }
      }

    }

  }
}
</script>
