<template>
  <div class="tw-flex tw-items-center tw-text-skin-secondary tw-space-x-2">
    <button
      class="tw-transition-defaults tw-transform hover:tw--translate-x-1"
      @click="$router.back()"
    >
      <MessengerBaseIcon :size="5" name="arrow-left-small" />
    </button>
    <div>Invitation</div>
  </div>
</template>
<script>
export default {
  props: ["route"],
  name: "BackBtn",
};
</script>
