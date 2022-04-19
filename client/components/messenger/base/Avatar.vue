<template>
  <div :class="[
        square ? 'tw-rounded-2xl' : 'tw-rounded-full',
      ]" :style="`height:${size}rem; width:${size}rem `" class="tw-relative  ">
    <div

        :class=" square ? 'tw-rounded-2xl' : 'tw-rounded-full'"

        class="tw-absolute tw-inset-0 tw-bg-gray-200 dark:tw-bg-[#323638] "></div>
    <v-img
        :class=" square ? 'tw-rounded-2xl' : 'tw-rounded-full'"
        :src="src"
        height="100%"
        width="100%"
        @load="loaded=true"
    >

    </v-img>

    <v-fade-transition>
      <div
          v-if="loading"
          :class="[square ? ' tw-rounded-2xl' : 'tw-rounded-full']"
          class="tw-absolute tw-inset-0 tw-bg-black/30 tw-z-10 tw-flex-center"
      >
        <MessengerBaseLoader class="tw-text-white"/>
      </div>
    </v-fade-transition>
    <span
        v-if="[0,1,2].includes(status)"
        :class="[
        position,
        statusClass,
      ]"
        class="tw-absolute tw-w-4 tw-h-4 tw-border-4 tw-border-white dark:tw-border-[rgb(23,25,26)] tw-rounded-full"
    />
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loaded: false
    }
  },

  props: {
    src: {},
    size: {default: 3.5},
    status: {},
    statusPosition: {},
    loading: {type: Boolean, default: false},
    square: {type: Boolean, default: false}
  },
  computed: {
    statusClass() {
      if (this.status == 1) return "tw-bg-green-600 "
      if (this.status == 2) return "tw-bg-orange-600 "
      return "tw-bg-gray-600 "
    }, position() {
      if (this.statusPosition) return this.statusPosition
      if (this.square) return 'tw--right-1 tw-top-0'
      return 'tw-right-0 tw-top-1'
    }
  }
}
</script>
