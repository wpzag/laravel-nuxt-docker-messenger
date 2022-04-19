<template>
  <div :style="{height:$store.getters['messenger/mainPageHeight']}"
       class="tw-w-full ">
    <div class="tw-space-y-4  tw-h-full tw-p-10 tw-w-full  tw-overflow-y-auto">
      <div class="tw-flex-center tw-flex-col tw-mb-16">
        <div class="tw-text-center tw-text-skin-primary tw-mb-2 tw-text-lg"> {{ title }}</div>
        <div class="tw-bg-skin-primary tw-w-8 tw-h-1 tw-mb-1"></div>

        <div class="tw-bg-skin-primary tw-w-3 tw-h-1 "></div>
      </div>
      <slot>
      </slot>

    </div>
  </div>

</template>
<script>
export default {
  props: ['title']

}
</script>
