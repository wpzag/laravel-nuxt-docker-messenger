<template>


  <div
      class="tw-bg-gray-100 dark:tw-bg-skin-background-200 tw-rounded-xl tw-p-5 tw-flex tw-space-x-3 tw-items-center tw-justify-center"
  >
    <div class="tw-flex-shrink-0 tw-text-skin-secondary">
      <MessengerBaseIcon
          :name="icon"
          class="tw-w-8 tw-h-8 "
      />
    </div>
    <div class="tw-flex-1 tw-space-y-2   tw-text-skin-secondary">
      <div class="tw-text-xs tw-flex tw-justify-between tw-space-x-3 tw-max-w-[18rem] ">
        <div class="tw-truncate  ">{{
            fileName
          }}
        </div>
        <span
        >{{ percent }}%</span
        >
      </div>
      <MessengerBaseProgressBar
          :classes="success ? 'tw-bg-green-300' : 'tw-bg-blue-400'"
          :color="success ? 'green' : 'blue'"
          :percentage="percent"
          tw-rounded
      />
      <!--          <v-progress-linear-->

      <!--              :size="100"-->
      <!--              :value="percent"-->
      <!--              background-color="#d6d6d6"-->

      <!--              class="tw-h-5 tw-flex-1"-->

      <!--          >-->
      <!--            {{ percent }} %-->
      <!--          </v-progress-linear>-->
    </div>

    <div class="tw-flex-shrink-0 tw-w-6">
      <button
          v-if="!success"
          v-ripple
          class="tw-text-gray-400 tw-transform hover:tw-scale-110 tw-transition-all tw-duration-300 tw-ease-out"
          @click="$emit('close-toast')"
      >
        <MessengerBaseIcon name="close" size="4"></MessengerBaseIcon>
      </button>
      <MessengerBaseIcon
          v-if="success"
          class="tw-text-green-500"
          name="check"
          size="4"
      />
    </div>
  </div>

</template>
<script>
export default {
  name: 'uploadingBar',
  props: ['icon', 'threadId', 'file', 'fileName', 'store', 'type', 'extra', '$axios', '$toast'],
  data() {
    return {
      percent: 0,
      success: false
    }
  }, mounted() {
    this.upload()
  },
  methods: {
    async upload() {
      let formData = new FormData()

      formData.append(this.type, this.file)
      formData.append("temporary_id", '312sdamdlk324sada')

      if (this.store.state.messenger.thread.messages.reply_to) {
        formData.append("reply_to_id", this.store.state.messenger.thread.messages.reply_to.id)

      }

      if (this.extra) formData.append("extra", JSON.stringify(this.extra))


      return await this.$axios.$post(
          `/messenger/threads/${this.threadId}/${this.type === 'audio' ? 'audio' : this.type + 's'}`,
          formData,
          {
            onUploadProgress: (event) =>
                (this.percent = Math.round((event.loaded * 100) / event.total))
          }
      ).then(() => {
        this.success = true
        setTimeout(() => {
          this.$emit('close-toast')
        }, 100)
        this.store.commit("messenger/thread/messages/reply_to", null)

      }).catch((error) => {
        if (error?.response?.status === 422) {
          let errors = error?.response?.data?.errors
          if (errors) {
            for (const item in errors) {
              errors[item].forEach(i => this.$toast.error(i))
            }

          }

          // this.$toast.error("This file format is not supported")

        }
        this.$emit('close-toast')

      })
    }
  }
}
</script>
<style>
.ms-upload-toast {
  @apply tw-p-0 tw-bg-transparent tw-bottom-7
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-enter-active {
  animation-name: fadeIn;
  animation-duration: 150ms;
  animation-fill-mode: both;
}

.fade-leave-active {
  animation-name: fadeOut;
  animation-duration: 100ms;
  animation-fill-mode: both;
}

.fade-move {
  transition-timing-function: ease-in-out;
  transition-property: all;
  transition-duration: 100ms;
}
</style>
