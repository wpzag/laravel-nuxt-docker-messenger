<template>
  <div
      class="tw-relative tw-overflow-hidden tw-rounded-full tw-w-full dark:tw-bg-gray-600 tw-bg-gray-200 tw-h-1"
  >
    <div
        :aria-valuenow="percentage"
        :class="classes"
        :style="{ width: `${percentage}%` }"
        aria-valuemax="100"
        aria-valuemin="0"
        class="tw-h-full progressbar tw-rounded-full tw-transition-all tw-duration-200"
        role="progressbar"
        v-bind="$attrs"
    >
      <span class="tw-flex tw-items-center tw-h-full">
        <slot></slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    classes: {}
  }
}
</script>
