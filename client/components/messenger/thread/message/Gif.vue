<template>
  <div :style="{width:width+'px',height:height+'px'}">
    <v-img
        :src="message.body"
        aspect-ratio="1"
        class="tw-relative tw-cursor-pointer  tw-bg-gray-300 dark:tw-bg-skin-background-200 "
        height="100%"
        width="100%"
        @click="expand()"
        @load="loadedHandler"
    >
      <template v-slot:placeholder>
        <MessengerBaseLoader class="tw-absolute tw-inset-center tw-text-white tw-text-sm"/>
      </template>
    </v-img>

  </div>

</template>
<script>
import useMediaMessage from "@/hooks/messenger/useMediaMessage"

export default {
  props: ["message", "ownMessage"],
  setup({message}) {
    const {loading, loadedHandler, height, width, expand} = useMediaMessage(message, 'gif')
    return {loading, loadedHandler, height, width, expand}
  }
}
</script>

