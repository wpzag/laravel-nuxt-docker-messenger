<template>
  <div
      :style="{width:width+'px',height:height+'px'}"
      class="tw-overflow-hidden   tw-relative tw-flex   tw-overflow-hidden tw-justify-around tw-items-center"
  >


    <vue-plyr :options="{width:width+'px',height:height+'px'}" :style="{width:width+'px',height:height+'px'}">
      <video
          :height="height"
          :width="width"
          controls
          crossorigin
          playsinline

          preload="metadata"

      >
        <source
            :src="message.video"
            type="video/mp4"
        />
      </video>

    </vue-plyr>

  </div>
</template>

<script>

import useMediaMessage from "@/hooks/messenger/useMediaMessage"

export default {
  props: ["message", "ownMessage"],
  setup({message}) {
    const {height, width} = useMediaMessage(message)
    return {height, width}
  }
}
</script>
