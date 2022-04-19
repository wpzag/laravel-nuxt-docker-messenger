<template>
  <div class="tw-flex tw-flex-col tw-space-y-2 ">

    <div v-for="item in list"
         class="tw-bg-gray-100 tw-hover-scale-xs rounded-lg tw-text-gray-700 dark:tw-text-white dark:tw-bg-skin-background-400">
      <MessengerThreadMessageAudio :message="item"/>
    </div>


  </div>
</template>
<script>
export default {
  props: ["list"]


}
</script>
