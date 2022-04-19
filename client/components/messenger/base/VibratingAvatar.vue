<template>
  <div :style="{ width: size + 'px', height: size + 'px' }">
    <div class="ms-call-animation">
      <v-img :src="$messenger.activeThread().avatar.sm" class="ms-img-circle tw-rounded-full"/>
      <!--      <MessengerBaseAvatar :size="size" :src="$messenger.activeThread().avatar.md"/>-->
    </div>
  </div>
</template>
<script>
export default {

  props: ["size", "imageSize", "src", "vibrating"]
}
</script>
<style lang="scss" scoped>
.ms-call-animation {
  background: #fff;
  width: 100%;
  height: 100%;
  position: relative;

  border-radius: 100% !important;
  border: solid 5px #fff;

  animation: play 1.6s ease infinite;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
}

.ms-img-circle {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  position: absolute;
  overflow: hidden;
  /*left: -5px !important;*/
  /*top: -5px !important;*/
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes play {
  0% {
    transform: scale(1);
  }
  15% {
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.4);
  }
  25% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.4),
    0 0 0 20px rgba(255, 255, 255, 0.2);
  }
  25% {
    box-shadow: 0 0 0 15px rgba(255, 255, 255, 0.4),
    0 0 0 30px rgba(255, 255, 255, 0.2);
  }
}
</style>
