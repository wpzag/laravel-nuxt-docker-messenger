<template>
  <div class="tw-flex-center smd:tw-hidden tw-flex-col tw-h-full tw-w-full smd:tw-hidden">


    <div>
      <VueLottiePlayer
          height="20rem"
          loop
          name="scooterAnim"
          path="https://assets9.lottiefiles.com/private_files/lf30_TBKozE.json"
          width="700px"

      />
    </div>
    <div class="tw-font-display tw-text-2xl tw-text-skin-secondary">
      Select A Chat To Start
    </div>
  </div>
</template>
<script>
import VueLottiePlayer from "vue-lottie-player"

export default {
  components: {
    VueLottiePlayer
  }
}
</script>
