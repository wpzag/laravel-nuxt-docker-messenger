<template>
  <div
      class=" tw-h-14 tw-px-3 tw-relative tw-flex   tw-overflow-hidden tw-justify-around tw-items-center"
  >
    <MessengerBaseIconButton
        :class="ownMessage?'':'tw-text-skin-primary/80 hover:tw-text-skin-primary' "
        :icon="!playing ? 'play' : 'pause'"
        size="6"
        @click="toggle"
    />


    <div
        :id="`wave-surfer-${message.id}`"
        :class="ready ? 'tw-translate-y-0 tw-scale-100' : ' tw-opacity-0 tw-translate-y-3' "
        class="tw-w-full tw-overflow-hidden tw-transition-defaults tw-transform tw-pl-1 tw-pr-4 tw-cursor-pointer"
    />

    <div class=" tw-text-xs">{{ duration }}</div>

    <v-fade-transition>
      <div class="tw-absolute tw-inset-center tw-text-sm">
        <MessengerBaseLoader v-if="!ready && !error" :class="ownMessage?'tw-text-white/60':'tw-text-skin-primary '"/>
        <div v-if="error" class="tw-text-red-500">Invalid audio</div>
      </div>

    </v-fade-transition>

  </div>
</template>

<script>
import useWaveSurfer from "@/hooks/useWaveSurfer"
import {onMounted} from "@nuxtjs/composition-api"

export default {
  props: ["message", "ownMessage"],

  setup({message, ownMessage}) {
    const {
      init, toggle, ready, playing, duration, error
    } = useWaveSurfer(`wave-surfer-${message.id}`, message.audio, ownMessage)

    onMounted(() => {
      init()
    })
    return {init, toggle, ready, playing, duration, error}
  }

}
</script>
