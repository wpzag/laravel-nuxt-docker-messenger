<template>

  <div :class="{'tw-cursor-pointer':!loading}" class=" tw-overflow-hidden   tw-transition-fix tw-relative "
  >
    <v-img
        :src="message.image.sm"
        aspect-ratio="1"
        class="tw-transform tw-group tw-opacity-80 tw-relative hover:tw-opacity-100  tw-transition-defaults dark:tw-bg-[#323638] tw-bg-gray-300  "
        height="100%"
        style="cursor: pointer"
        width="100%"
        @click="expand"
        @load="loading=false"

    >

    </v-img>
    <template v-if="isLastItem && !expanded && !loading ">
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
  },
  computed: {
    expanded() {
      return this.$store.state.messenger.thread.filesWidget.expanded
    }
  },
  methods: {
    expand() {
      if (this.loading) return
      this.$store.commit('messenger/dialogs/openLightBox', {src: this.message.image.lg, type: 'image'})
    }
  }
}
</script>
