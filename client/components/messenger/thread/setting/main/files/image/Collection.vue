<template>
  <div class="tw-overflow-hidden tw-space-y-1">
    <div class="tw-grid tw-grid-flow-row tw-grid-cols-3 tw-gap-1">
      <MessengerThreadSettingMainFilesImageItem
          v-for="(message, index) in list"
          :key="index"
          v-ripple
          :isLastItem="index+1 === list.length && [...list,...unlisted].length >6 "

          :message="message"
          class="tw-rounded tw-overflow-hidden"
      />

    </div>


  </div>
</template>
<script>
export default {
  props: ["list", "unlisted"]


}
</script>
