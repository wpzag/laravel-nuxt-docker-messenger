<template>
  <div
      class="tw-overflow-hidden tw-flex tw-space-x-3 tw-items-center tw-transform tw-translate-x-0 tw-transition-transform tw-ease-out tw-duration-200 hover:tw-translate-x-1 tw-group tw-cursor-pointer"
  >

    <div :class="`${textColor} ${bgColor}`" class="tw-p-3 tw-rounded">
      <MessengerBaseIcon :name="icon" :size="4"/>
    </div>

    <div>

        <span
            class="tw-text-sm tw-text-skin-secondary dark:tw-text-skin-base/70 tw-transition-colors group-hover:tw-text-skin-base tw-duration-300"
        >{{ name }} </span
        >
      <div
          class="tw-text-skin-caption group-hover:text-skin-secondary tw-duration-300 tw-transition-colors tw-text-xs"
      >
        {{ desc }}
      </div>
    </div>
    <span
        class="tw-absolute tw-right-10 tw-h-1 tw-w-1 tw-rounded-full tw-bg-skin-primary tw-transform tw--translate-y-1/2 tw-translate-x-4 tw-opacity-0 tw-ease-out group-hover:tw-opacity-100 group-hover:tw--translate-x-2 tw-duration-300 tw-top-1/2"
    ></span>
  </div>
</template>
<script>
export default {
  props: ["name", "icon", "desc", "textColor", "bgColor", "link"]
}
</script>
