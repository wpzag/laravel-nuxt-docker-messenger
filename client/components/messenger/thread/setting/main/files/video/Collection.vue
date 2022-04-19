<template>
  <div class=" tw-space-y-1">
    <div class="tw-grid tw-grid-flow-row tw-grid-cols-3 tw-gap-1">

      <MessengerThreadSettingMainFilesVideoItem
          v-for="(message, index) in list"
          :key="index"
          v-ripple
          :isLastItem="index === list.length - 1"
          :message="message"
      />
    </div>


  </div>
</template>
<script>
export default {
  props: ["list"]


}
</script>
