<template>
  <iframe
      :src="`https://www.youtube.com/embed/${message.body}`"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture " allowfullscreen
      class="tw-aspect-video tw-w-full tw-shimmer"
      frameborder="0"
  ></iframe>
  <!--  <vue-plyr>-->
  <!--    <div :data-plyr-embed-id="message.body" :style="{width:'500px',height:'500px'}" data-plyr-provider="youtube"></div>-->
  <!--  </vue-plyr>-->
</template>

<script>

export default {
  props: ["message", "ownMessage"]

}
</script>
