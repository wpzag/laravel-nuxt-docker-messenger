<template>
  <div>
    <div
        class="tw-fixed tw-inset-0 tw-z-50 tw-w-screen tw-h-screen"
        @dragleave.prevent="dragleave"
        @drop.prevent="drop"
    >
    </div>
    <v-slide-y-transition>
      <div
          v-if="$store.state.messenger.thread.uploads.dropzone"
          class="tw-fixed tw-inset-0 tw-bg-skin-background-800/70 tw-w-full tw-h-full tw-z-40 tw-flex tw-justify-center tw-items-center tw-z-50"
          @drop.prevent="drop"
      >

        <VueLottiePlayer
            height="700px"
            loop
            name="scooterAnim"
            path="/animations/drop-file-here.json"
            width="700px"
            @drop.prevent="drop"
        />
      </div>
    </v-slide-y-transition>


  </div>
</template>

<script>
import VueLottiePlayer from "vue-lottie-player"

export default {


  components: {
    VueLottiePlayer
  },
  methods: {
    dragleave() {
      this.$store.commit("messenger/thread/uploads/dropzone", false)
    },
    drop(event) {
      this.$store.dispatch("messenger/thread/uploads/upload", event.dataTransfer.files[0])
    }


  }
}
</script>
