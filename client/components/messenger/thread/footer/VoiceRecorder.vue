<template>
  <div :class="stopped  ? ' tw-w-96 ' : ' tw-w-42'"
       class="tw-absolute tw-max-w-full tw--top-14 tw--right-5 tw-bg-gray-100 dark:tw-bg-skin-background-400 tw-overflow-hidden  tw-transition-defaults tw-z-20  tw-text-skin-secondary  tw-rounded-l-full tw-rounded-tr-full  ">
    <div
        class=" tw-relative"
    >
      <v-slide-y-reverse-transition>

        <div
            v-if="downloading"
            class=" tw-absolute tw-bg-gray-100 dark:tw-bg-skin-background-400 tw-inset-0 tw-z-50 tw-flex tw-justify-around tw-items-center tw-space-x-4 tw-px-4">
          <MessengerBaseIcon
              name="upload"
              size="5"
          />
          <MessengerBaseProgressBar
              :percentage="percent"
              classes=" tw-bg-blue-400"
              color=" blue"
          />
          <span
          >{{ percent }}%</span
          >
        </div>
      </v-slide-y-reverse-transition>
      <div class="tw-flex tw-justify-between tw-items-center  tw-space-x-3 tw-px-5 tw-py-2 ">
        <div
            v-if="!stopped"
            class="tw-absolute tw-inset-0 tw-rounded-l-full tw-rounded-tr-full tw-z-30 tw-overflow-hidden"
        >
          <div
              :style="`width:${seconds * 2}px`"
              class="tw-h-full tw-transition-defaults tw-bg-blue-500"
          ></div>
        </div>


        <div
            class="dark:tw-text-white tw-text-skin-secondary  tw-rounded-full tw-text-sm tw-px-1 tw-py-1 tw-z-40 tw-flex tw-items-center tw-space-x-3"
        >
          <div v-if="!stopped" class="tw-w-2 tw-h-2 tw-rounded-full tw-bg-red-400">
            <div class="recorder-btn-animation"></div>
          </div>
          <div>{{ minutes }}</div>
        </div>
        <v-slide-y-reverse-transition>

          <div v-show="stopped" id="waveform" class="tw-flex-1"></div>
        </v-slide-y-reverse-transition>
        <MessengerThreadFooterButton
            :class="stopped ? 'dark:tw-text-white' : 'tw-text-red-400'"
            :icon="icon"
            class="tw-z-30"
            @click="togglePlay"
        />
        <v-scale-transition>
          <MessengerBaseBtn
              v-if="stopped "
              class="tw-bg-green-500 hover:tw-bg-green-400 tw-text-xs tw-z-30"
              @click="send"
          >Send
          </MessengerBaseBtn>
        </v-scale-transition>
      </div>

    </div>

  </div>
</template>
<script>
import WaveSurfer from "../../../../node_modules/wavesurfer.js/dist/wavesurfer"
import Recorder from 'js-audio-recorder'
import useColors from "@/hooks/useColors"

export default {
  setup() {
    const {getColor} = useColors()
    let color = getColor("skin-primary")
    return {color}
  },
  data() {
    return {
      open: false,
      wavesurfer: null,
      recorder: null,
      seconds: 0,
      playing: false,
      stopped: false,
      audio: null,
      mediaRecorder: null,
      minutes: "00:00",

      downloading: false,
      percent: 0
    }
  },
  computed: {

    icon() {
      if (!this.stopped) return "stop"
      return this.playing ? "pause" : "play"
    }
  },
  mounted() {
    this.start()
  },
  beforeDestroy() {
    this.reset()
  },

  methods: {
    async send() {

      this.downloading = true
      let formData = new FormData()

      formData.append('audio', this.audio)
      formData.append("temporary_id", '312sdamdlk324sada')

      formData.append("extra", JSON.stringify({type: 'voice'}))
      if (this.$store.state.messenger.thread.messages.reply_to) {
        formData.append("reply_to_id", this.$store.state.messenger.thread.messages.reply_to.id)

      }
      await this.$axios.$post(
          `/messenger/threads/${this.$store.state.messenger.activeThread.thread.id}/audio`,
          formData,
          {
            onUploadProgress: (event) =>
                (this.percent = Math.round((event.loaded * 100) / event.total))
          }
      )
      this.$store.commit("messenger/thread/messages/reply_to", null)

      this.$store.commit("messenger/thread/uploads/audioRecorder", false)

      // this.downloading = true

    },
    reset() {

      this.wavesurfer?.destroy()
      this.recorder?.destroy()

      this.recorder = null
      this.playing = false
      this.stopped = false
      this.open = false
      this.seconds = 0

      this.minutes = "00:00"
    },
    togglePlay() {
      if (!this.stopped) return this.stop()

      if (!this.playing) {
        this.play()
      } else {
        this.pause()
      }
    },
    start() {
      this.wavesurfer = WaveSurfer.create({
        container: "#waveform",
        mediaType: "audio",
        barWidth: 1,
        hideScrollbar: true,
        responsive: true,
        normalize: true,
        fillParent: true,
        height: 30,
        waveColor: this.$store.getters['messenger/isDark'] ? "#444647" : "#d8d8d8",
        cursorWidth: 0,
        progressColor: this.color,
        barGap: 0
      })
      this.recorder = new Recorder()

      const getMinutes = seconds => {
        this.minutes = this.$moment("1900-01-01 00:00:00")
            .add(seconds.toFixed(1), "seconds")
            .format("mm:ss")
      }
      this.recorder.onprogress = (params) => {
        getMinutes(params.duration)
      }

      this.recorder.start()

    },

    stop() {
      this.recorder.stop()
      this.stopped = true
      this.audio = this.recorder.getWAVBlob()
      this.wavesurfer.load(URL.createObjectURL(this.audio))
      this.recorder?.destroy()

    },
    pause() {
      this.wavesurfer.pause()
      this.playing = false
    },
    play() {
      this.wavesurfer.play()
      this.playing = true
    }
  }
}
</script>
<style>
.recorder-btn-animation {
  background: @apply tw-bg-red-400;
  width: 100%;
  height: 100%;
  position: relative;

  border-radius: 100% !important;
  /* tw-border: solid 3px transparent; */

  animation: play 1.6s ease infinite;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
}

@keyframes play {
  0% {
    transform: scale(1);
  }
  15% {
    box-shadow: 0 0 0 1px rgba(236, 72, 72, 0.4);
  }
  25% {
    box-shadow: 0 0 0 2px rgba(236, 72, 72, 0.4),
    0 0 0 5px rgba(236, 72, 72, 0.2);
  }
  25% {
    box-shadow: 0 0 0 4px rgba(236, 72, 72, 0.4),
    0 0 0 6px rgba(236, 72, 72, 0.2);
  }
}
</style>
