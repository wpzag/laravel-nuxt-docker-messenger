<template>

  <div v-tippy :content="message.body" class="tw-h-24 rounded tw-w-full tw-bg-black tw-overflow-hidden  tw-relative "
  >

    <div class=" tw-absolute tw-inset-center ">
      <MessengerBaseIconButton class="tw-text-white/60 hover:tw-text-white tw-transition-defaults tw-hover-scale-sm"
                               icon="play" size="10"
                               @click="expand"/>
    </div>


    <template v-if="isLastItem && !expanded && !loading">
      <a
          class="tw-absolute tw-inset-0 tw-bg-black/60 tw-flex-center tw-text-white/80 tw-cursor-pointer tw-group z-50"
          @click.prevent="$store.dispatch('messenger/thread/filesWidget/more') "
      >
              <span
                  class="group-hover:tw-scale-125 tw-transform tw-duration-500 tw-ease-out"
              >+{{
                  (parseInt($store.state.messenger.thread.filesWidget.total) - 6)
                }}</span
              >
      </a>
    </template>

  </div>


</template>
<script>
export default {
  props: ["message", "isLastItem"],

  data() {
    return {
      loading: true
    }
  }, computed: {
    expanded() {
      return this.$store.state.messenger.thread.filesWidget.expanded
    }
  },
  methods: {
    expand() {
      if (this.loading) return
      this.$store.commit('messenger/dialogs/openLightBox', {src: this.message.body, type: 'video'})
    }
  }
}
</script>
