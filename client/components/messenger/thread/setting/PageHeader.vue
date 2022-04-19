<template>
  <div class="tw-flex tw-justify-between tw-items-center tw-mb-5">
    <div class="tw-text-skin-secondary">{{ title }}</div>

    <nuxt-link
        v-if="link"
        v-ripple
        :to="link"
        class="tw-text-white tw-bg-skin-primary tw-rounded-2xl tw-p-3 tw-hover-scale-md"

    >
      <MessengerBaseIcon :name="icon" :size="4"/>
    </nuxt-link>

    <button v-else v-ripple class="tw-text-white tw-bg-skin-primary tw-rounded-2xl tw-p-3 tw-hover-scale-md"
            @click="$emit('clicked')">
      <MessengerBaseIcon :name="icon" :size="4"/>
      
    </button>
  </div>
</template>
<script>
export default {
  props: ["title", "icon", "link"]
}
</script>
