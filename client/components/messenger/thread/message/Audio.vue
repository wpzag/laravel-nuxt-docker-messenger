<template>

  <div
      :class="{
        'tw-h-32': show,
        'tw-h-14': !show,
        'tw-justify-center  ': !show,
      }"
      class=" tw-transition-defaults tw-flex tw-flex-col tw-overflow-hidden tw-group  "
  >
    <div
        :class="{
          'tw-my-3': show,
        }"
        class="tw-transform tw-transition-defaults  tw-flex tw-items-center tw-w-full tw-px-3 tw-space-x-3"
    >
      <MessengerBaseIconButton
          :class="ownMessage?'':'tw-text-skin-primary/80 hover:tw-text-skin-primary' "
          :icon="icon"
          size="5"
          @click="submit"
      />
      <div
          class="tw-cursor-pointer tw-flex-1 tw-truncate"
          @click="fileNameClicked"
      >
        {{ message.type === 'audio' ? message.body : message.owner.name }}
      </div>

      <MessengerThreadMessageDownloadButton :file="message.audio"
                                            :name="message.body"/>
    </div>

    <div
        :id="message.id"
        :class="
          show
            ? 'tw-opacity-100 tw-translate-y-0 tw-scale-100'
            : ' tw-scale-0 tw-opacity-0 tw-translate-y-3'
        "
        class="tw-overflow-hidden tw-transition-defaults tw-transform tw-px-3"
    ></div>

    <MessengerBaseIconButton
        v-if="ready"
        :class="ownMessage? ' tw-text-white/50 hover:tw-text-white' :' tw-text-skin-primary/50 hover:tw-text-skin-primary'"
        class="tw-absolute tw-z-20 tw-transition-defaults tw-flex-center  tw-inset-x-center tw--bottom-1  "
        icon="arrow-up"
        size="5"
        @click="close"
    />

    <v-fade-transition>
      <div v-if="show && !ready "
           class="tw-absolute  tw-inset-x-center tw-bottom-7 ">

        <MessengerBaseLoader :class="ownMessage?'tw-text-white' :'tw-text-skin-primary'" class=" tw-text-sm"/>
      </div>
    </v-fade-transition>
  </div>

</template>

<script>
import useWaveSurfer from "@/hooks/useWaveSurfer"
import {computed, ref} from "@nuxtjs/composition-api"

export default {
  props: ["message", "ownMessage"],

  setup({message, ownMessage}) {
    const {
      init, toggle, ready, playing, destroy
    } = useWaveSurfer(message.id, message.audio, ownMessage)
    const show = ref(false)

    function fileNameClicked() {
      show.value = !show.value

      !ready.value ? init(true) : destroy()


    }

    const icon = computed(() => {
      if (!show.value) return message.type === 'audio' ? 'music' : 'mic'
      return !playing.value ? 'play' : 'pause'
    })


    function submit() {

      ready.value ? toggle() : init()

    }

    function close() {
      destroy()
      show.value = false
    }

    return {init, submit, close, fileNameClicked, playing, ready, show, icon}
  },
  watch: {
    show() {
      let thread = document.getElementById("thread-box")
      if (thread.offsetHeight + thread.scrollTop >= thread.scrollHeight) {

        setTimeout(() => this.$messenger.scrollToBottom(false, true)
            , 200)

      }
    }
  }

}
</script>
