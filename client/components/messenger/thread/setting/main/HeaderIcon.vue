<template>
  <button
      v-ripple
      v-tippy
      :class="colors"
      :content="name"
      class="tw-transition-all tw-duration-300 tw-w-16 tw-h-10 tw-flex-center tw-rounded-xl hover:tw-ring-2 dark:tw-ring-offset-[rgb(23,25,26)] hover:tw-ring-offset-2 tw-text-sm tw-flex-center tw-space-x-2"
      v-on="$listeners"
  >
    <MessengerBaseIcon v-if="!isLoading" :loading="isLoading" :name="icon" size="4"/>
    <MessengerBaseLoader v-else class="tw-text-sm"></MessengerBaseLoader>
  </button>
</template>
<script>
export default {
  props: ["icon", "colors", "name", "isLoading"]
}
</script>
