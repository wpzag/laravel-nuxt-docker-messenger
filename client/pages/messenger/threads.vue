<template>
  <div class="tw-flex tw-flex-1 ">
    <MessengerThreadsList :style="{height:$store.getters['messenger/mainPageHeight']}"
                          class="tw-bg-skin-background-400 tw-flex-shrink-0 "/>

    <NuxtChild class="smd:tw-fixed smd:tw-inset-0 smd:tw-z-40  "/>

  </div>
</template>

<script>
export default {
  layout: "messenger"


}
</script>
