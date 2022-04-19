<template>
  <div :class="selected ? 'tw-text-skin-base' : 'tw-text-skin-secondary'">
    <!--    'tw-delay-500 ': widgetExpanded,-->

    <button
        :class="{
        'tw-opacity-0   ': widgetExpanded && !selected,
        'tw-translate-x-[2rem]': widgetExpanded && name === 'images',
        'tw--translate-x-[2.7rem]': widgetExpanded && name === 'videos',
        'tw--translate-x-[7.5rem]': widgetExpanded && name === 'documents',
        'tw--translate-x-[14.5rem]': widgetExpanded && name === 'audio',
      }"
        :disabled="widgetExpanded"
        class="tw-mb-7 tw-relative tw-capitalize  tw-text-center tw-flex tw-flex-col tw-items-center hover:text-skin-base tw-transition-all tw-ease-out tw-duration-300 tw-group tw-justify-center"
        @click.prevent="clicked()"
    >
      <div>{{ name }}</div>
      <div
          :class="{
          'tw-opacity-0 tw-translate-y-3  tw-ease-out tw-duration-300 tw-transition-all tw-transform group-hover:tw-translate-y-0 group-hover:tw-opacity-100':
            !selected,
          'tw-opacity-100': selected,
          'tw-invisible': widgetExpanded,
        }"
          class="tw-absolute tw-left-1/2 -translate-1/2 tw--bottom-2 tw-h-1 tw-w-1 tw-rounded-full tw-bg-black dark:tw-bg-white"
      ></div>
    </button>
  </div>
</template>
<script>
export default {
  props: ["name", "index"],
  computed: {
    widgetExpanded() {
      return this.$store.state.messenger.thread.filesWidget.expanded
    },
    type() {
      return this.$store.state.messenger.thread.filesWidget.type
    },
    selected() {
      return this.type === this.name
    }
  }, methods: {
    clicked() {
      this.$store.commit('messenger/thread/filesWidget/type', this.name)
      this.$store.dispatch('messenger/thread/filesWidget/fetch', {type: this.name})

    }
  }
}
</script>
