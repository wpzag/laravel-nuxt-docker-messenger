<template>
  <div class="tw-fixed-overlay-full tw-bg-black/50 tw-flex-center tw-z-50">

    <div
        v-click-outside="()=> $emit('close')"
        class="tw-bg-white dark:tw-bg-skin-background-200 tw-p-8   tw-max-h-max tw-w-[30rem] tw-space-y-5">

      <div class="tw-flex-center tw-flex-col tw-mb-3">

        <div class="tw-text-center tw-text-skin-primary tw-mb-5 tw-text-lg"> {{ name }}</div>
        <div class="tw-bg-skin-primary tw-w-3 tw-h-1"></div>
      </div>

      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ['name']
}
</script>
