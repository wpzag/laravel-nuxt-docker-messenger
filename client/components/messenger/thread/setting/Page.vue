<template>
  <div class="tw-py-5 tw-relative">

    <div class="tw-flex tw-items-center tw-space-x-2 tw-mb-4">
      <!--      class="hover tw-transition-defaults tw-transform hover:tw&#45;&#45;translate-x-1"-->
      <button

          @click="goBack"
      >
        <MessengerBaseIcon :size="5" name="arrow-left-small"/>
      </button>
      <div>{{ name }}</div>
    </div>
    <slot v-if="!loading"></slot>
    <div v-else>
      <MessengerBaseLoader class="tw-text-skin-base tw-mt-14 tw-mx-auto"/>
    </div>
  </div>
</template>
<script>
export default {
  props: ["name", "loading", "back"],
  methods: {
    goBack() {
      this.$router.replace(this.back)
    }
  }
}
</script>
