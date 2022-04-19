<template>
  <button
      class="tw-flex tw-flex-shrink-0  focus:tw-outline-0 active:tw-outline-0 tw-hover-scale-md  tw-w-6 tw-h-6"
      type="button"
      v-on="$listeners"
  >
    <MessengerBaseIcon :name="icon" size="6"/>
  </button>
</template>
<script>
export default {
  props: {
    icon: {
      type: String
    }

  }
}
</script>
