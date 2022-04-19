<template>
  <div :style="{width:width+'px',height:height+'px'}" @click="expand()">
    <v-img
        :class="{'tw-transform tw-opacity-80 hover:tw-opacity-100 hover:tw-scale-110 tw-transition-defaults tw-cursor-pointer':!loading }"
        :src="message.image.md"
        class="   tw-cursor-pointer tw-relative  tw-bg-gray-300 dark:tw-bg-skin-background-200 "
        :height="height+'px'"
        style="cursor: pointer"

        :width="width+'px'"

        @load="loading=false"
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
    const {loading, loadedHandler, height, width, expand} = useMediaMessage(message, 'image')
    return {loading, loadedHandler, height, width, expand}
  }


}
</script>
