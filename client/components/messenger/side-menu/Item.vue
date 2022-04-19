<template>
  <button
      v-ripple
      v-tippy="{ placement: 'right' }"

      :class="active?
      'tw-text-skin-primary  tw-bg-skin-primary/10 dark:tw-bg-skin-primary/20 dark:tw-text-skin-primary/90':
        'tw-text-gray-400 hover:tw-text-skin-primary hover:tw-bg-skin-primary/10'
    "
      :content="name"

      class="tw-transition-all tw-duration-300  tw-rounded-2xl tw-p-4 tw-relative tw-group tw-flex tw-justify-center tw-items-center tw-flex-col space-y-.5"
      v-on="$listeners"
  >
    <span v-if="notification" class="tw-absolute tw-top-3 tw-right-3">
      <span class="tw-flex tw-h-2 tw-w-2 tw-relative">
        <span
            class="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-red-300 tw-opacity-75"
        ></span>
        <span
            class="tw-relative tw-inline-flex tw-rounded-full tw-h-2 tw-w-2 tw-bg-red-400"
        ></span>
      </span>
    </span>
    <slot>
      <MessengerBaseIcon :name="icon" class="tw-h-5 tw-w-5"></MessengerBaseIcon>
    </slot>
  </button>
</template>
<script>
export default {
  props: ["name", "icon", "active", "notification", "link"]
}
</script>
