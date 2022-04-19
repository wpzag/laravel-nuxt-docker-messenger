<template>
  <button
      v-tippy
      :class="[bgColor,textColor,padding]"
      :content="name"
      class="tw-relative  tw-transform hover:tw-scale-110 tw-duration-300  tw-transition-all tw-rounded-full"
      @show=" () => !!(name && name !=='')"
      v-on="$listeners"
  >
    <MessengerBaseIcon :name="icon" :size="size"/>
    <div v-if="loading" :class="[bgColor,textColor]"
         class=" tw-absolute  tw-rounded-full tw-flex-center tw-inset-0">
      <MessengerBaseLoader class="tw-text-[0.50rem]"/>
    </div>
  </button>
</template>
<script>
export default {
  props: {
    size: {},
    icon: null,
    name: null,
    bgColor: {default: ''},
    padding: {default: 'tw-p-2'},
    textColor: {default: ''},
    loading: {}
  }

}
</script>
