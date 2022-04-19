<template>
  <div
    class="tw-flex-center tw-text-skin-secondary tw-flex-col tw-mt-10 tw-space-y-3"
  >
    <div class="tw-h-10 tw-w-10">
      <MessengerBaseIcon :name="icon" />
    </div>
    <div class="tw-text-small tw-text-center">
      {{ content }}
      <nuxt-link :to="link" class="tw-link"> , create ?</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  props: ["content", "icon", "link"],
};
</script>
