<template>
  <div class="tw-p-4 tw-w-[30rem]">
    <div :style="`height: ${height}px;width:${width}px`"
         class="tw-shimmer tw-mb-4 tw-mt-3 tw-mx-auto tw-cursor-pointer tw-rounded-lg tw-overflow-hidden">
      <v-img
          v-if="message.extra.image"
          :height="height"
          :src="message.extra.image"
          :width="width"
          alt=""
          @click="expand"
          @load="loadedHandler"
      />
    </div>

    {{ text }}

    <a
        v-if="message.body.length > 800 && !showFullText"
        class="tw-text-blue-500 "
        @click="showFullText = true"
    >more</a
    >

  </div>

</template>
<script>
import useMediaMessage from "@/hooks/messenger/useMediaMessage"

export default {
  props: ["message", "ownMessage"],
  setup({message}) {
    const {loading, loadedHandler, height, width, expand} = useMediaMessage(message, 'wiki')
    return {loading, loadedHandler, height, width, expand}
  },
  data() {
    return {
      showFullText: false
    }
  },
  computed: {
    text() {
      if (this.message.body.length < 800 || this.showFullText)
        return this.$messenger.linkify(this.message.body)

      return this.$messenger.linkify(this.message.body).substring(0, 800) + "..."
    }
  }
}
</script>
