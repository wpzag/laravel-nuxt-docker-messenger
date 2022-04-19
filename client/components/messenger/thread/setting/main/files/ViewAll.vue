<template>
  <div class="tw-text-center tw-cursor-pointer tw-mt-2">
    <a
        v-if="!widgetExpanded"
        class="tw-inline-block tw-text-skin-primary/50 tw-relative tw-text-sm tw-group tw-transition-colors tw-ease-out tw-duration-300 hover:tw-text-skin-primary/80"
        @click="$emit('clicked')"
    >
      <span
          class="tw-absolute tw-inset-x-center tw-bottom-0 h-[.05rem] tw-w-full bg-skin-primary/50 tw-transition-all tw-ease-out tw-duration-300 group-hover:tw-translate-y-1 group-hover:bg-skin-primary/80"
      ></span>
      View All</a
    >
  </div>
</template>
<script>
export default {
  computed: {
    widgetExpanded() {
      return this.$store.state.messenger.thread.filesWidget.expanded
    }
  }
}
</script>
