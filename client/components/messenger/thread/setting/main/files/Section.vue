<template>
  <div class="tw-relative">
    <button
        :class="{
        'tw-opacity-100 tw-translate-x-0 tw-delay-100 ': widgetExpanded,
        'tw-delay-0 tw-opacity-0': !widgetExpanded,
      }"

        class="tw-transition-all tw-ease-out tw-duration-300  tw-translate-x-3 tw-h-6 tw-w-6 tw-absolute tw--left-2 tw-top-0 tw-text-skin-secondary"
        @click.prevent="shrinkWidget()"
    >
      <MessengerBaseIcon class="tw-text-skin-secondary" name="arrow-left-small" size="5"/>
    </button>
    <div class="tw-flex tw-justify-between tw-overflow-x-auto tw-mt-5">

      <MessengerThreadSettingMainFilesMenuItem
          v-for="(name, index) in menu"
          :key="index"
          v-bind="{ name, index }"
      />
    </div>
    <MessengerThreadSettingMainFilesContent/>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    menu() {
      return this.$store.state.messenger.thread.filesWidget.menu
    },
    widgetExpanded() {
      return this.$store.state.messenger.thread.filesWidget.expanded
    }
  },
  methods: {
    shrinkWidget() {
      this.$store.dispatch("messenger/thread/filesWidget/shrink")
    }

  }
}
</script>
