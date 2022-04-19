<template>
  <div class="tw-dark">
    <div

        class="tw-px-8 tw-py-3         tw-bg-skin-background-200  tw-text-gray-700 dark:tw-text-white
 tw-min-w-[13rem] tw-relative"
    >
      <MessengerBaseCodeEditor
          :readonly="true"
          :value="message.body"
          class="tw-rounded-xl tw-overflow-hidden tw-group"
      />
      <v-slide-y-transition>
        <div
            v-if="coppied"

            v-tippy
            class="tw-px-2 tw-py-1 tw-rounded-xl tw-bg-green-500/90 tw-transition-defaults tw-cursor-pointer tw-hover-scale-sm hover:tw-text-white tw-absolute tw-top-2 tw-right-10"
            content="Copy Code"
        >
          Coppied !
        </div>
      </v-slide-y-transition>

      <button
          v-tippy
          class="tw-h-5  tw-w-5 tw-text-white/20 tw-transition-defaults tw-cursor-pointer tw-hover-scale-sm hover:tw-text-white tw-absolute tw-top-3 tw-right-3"
          content="Copy"
          @click="copyHandler"
      >

        <MessengerBaseIcon name="copy"/>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["message", "ownMessage"],
  data() {
    return {
      coppied: false
    }
  },
  mounted() {
    this.$messenger.scrollToBottom(this.ownMessage)
  },
  methods: {
    copyHandler() {
      this.coppied = true
      const copyText = this.message

      var dummy = document.createElement("textarea")

      document.body.appendChild(dummy)
      dummy.value = this.message.body
      dummy.select()
      document.execCommand("copy")
      document.body.removeChild(dummy)

      setTimeout(() => (this.coppied = false), 1000)
    }
  }
}
</script>
