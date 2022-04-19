<template>
  <div
      class="tw-fixed tw-bg-black/30 tw-inset-0 tw-h-screen tw-flex-center tw-z-50"
  >
    <v-fade-transition v-if="init">
      <div
          class="tw-absolute tw-w-full tw-bg-opacity-20 tw-h-full dark:tw-bg-skin-background-200/30 tw-z-50 tw-flex-center"
      >
        <MessengerBaseLoader/>
      </div>
    </v-fade-transition>
    <div
        v-if="!loading"
        :class="init   ? 'tw-invisible' : 'tw-visible'"
        class="tw-rounded tw-bg-skin-background-400"
    >
      <div
          class="tw-w-full tw-text-center tw-bg-gray-100 dark:tw-bg-skin-background-200 tw-rounded tw-p-4 tw-text-gray-500"
      >
        Edit Photo
      </div>
      <div v-show="loaded" class="tw-p-5">
        <figure
            v-show="loaded"
            class="tw-relative tw-h-[450px] tw-max-h-full tw-max-w-full tw-mx-5"
        >
          <img
              id="u-previewed-image"
              ref="selectedImage"
              :src="src"
              alt="cropped-image"
              @load="loadedHandler"
          />
        </figure>
        <div class="tw-mt-3 tw-w-full tw-rounded-xl tw-p-3">
          <div class="tw-flex-center">
            <MessengerBaseIconButton
                icon="rotate-right"
                name="Rotate right"
                size="6"
                @click="rotate('right')"
            />
            <MessengerBaseIconButton
                icon="rotate-left"
                name="Rotate left"
                size="6"
                @click="rotate('left')"
            />
            <MessengerBaseIconButton
                icon="zoom-in"
                name="Zoom in"
                size="6"
                @click="zoomIn()"
            />
            <MessengerBaseIconButton
                icon="zoom-out"
                name="Zoom out"
                size="6"
                @click="zoomOut()"
            />
          </div>

          <div class="tw-flex tw-justify-end tw-space-x-2">
            <button class="tw-text-red-500 tw-mr-2" @click="close()"
            >Cancel
            </button>
            <MessengerBaseBtn

                class="tw-bg-skin-primary tw-text-white"
                size="lg"
                @click="save()"
            >
              Submit
            </MessengerBaseBtn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cropper from "cropperjs"
import "cropperjs/dist/cropper.css"

export default {
  props: ["aspectRatio", "src"],
  data() {
    return {
      loaded: false,
      init: true,
      loading: false,
      cropper: null
    }
  },

  methods: {
    loadedHandler() {
      this.loaded = true
      this.initCropper(this.$refs.selectedImage)
    },
    initCropper(image) {
      this.init = true

      if (this.cropper) this.cropper.destroy()

      image.addEventListener("ready", () => {
        this.init = false
      })

      this.cropper = new Cropper(image, {
        autoCrop: true,
        aspectRatio: this.aspectRatio || null,
        autoCropArea: 1,
        viewMode: 1,
        responsive: true,
        dragMode: "move",
        background: false,
        zoomable: true,
        zoomOnWheel: false
      })
    },
    save() {
      this.loading = true
      this.cropper.getCroppedCanvas({}).toBlob(
          (blob) => {
            let reader = new FileReader()
            reader.readAsDataURL(blob)

            reader.onloadend = () => {
              let image = reader.result
              let dimensions = {
                height: this.cropper.getCroppedCanvas().height,
                width: this.cropper.getCroppedCanvas().width
              }

              this.$emit('submit', {image, blob, dimensions})
              this.loading = false
            }
          },
          "image/jpeg",
          0.8
      )


    },

    zoomIn() {
      this.cropper.zoom(0.1)
    },
    zoomOut() {
      this.cropper.zoom(-0.1)
    },
    rotate(direction) {
      direction === " right "
          ? this.cropper.rotate(-45)
          : this.cropper.rotate(45)
    },
    close() {
      // this.loaded = false
      this.$emit("closed")
      // if (this.cropper) this.cropper.destroy()
      // this.cropper = null
    }
  }
}
</script>
<style>
#u-previewed-image {
  height: 450px;
  max-width: 100%;
  tw-transform: translateX(0);
  tw-transition: all 0.5s;
}

.cropper-point.line-nw,
.cropper-point.line-ne,
.cropper-point.line-sw,
.cropper-point.line-se {
  tw-border-radius: 50% !important;
  height: 10px !important;
  width: 10px !important;
}
</style>
