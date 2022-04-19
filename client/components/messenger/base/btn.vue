<template>
  <button
      v-ripple
      :class="[
      { 'tw-px-3 tw-py-1': !this.size ,
     'tw-px-4 tw-py-3': this.size === 'lg', },bgColor,textColor,
    ]"
      :disabled="loading"
      class="tw-text-white tw-overflow-hidden tw-relative tw-rounded-lg tw-transition-all tw-transform tw-duration-100 tw-ease-out"
      v-on="$listeners"
  >
    <slot></slot>
    <div v-if="loading" :class="[bgColor,textColor]" class=" tw-absolute tw-flex-center tw-inset-0">
      <MessengerBaseLoader class="tw-text-sm "></MessengerBaseLoader>
    </div>
  </button>
</template>
<script>
export default {
  props: {
    size: {},
    bgColor: {default: 'tw-bg-skin-primary'},
    textColor: {default: 'tw-text-white'},
    loading: {}
  }

}
</script>
