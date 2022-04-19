import {
  computed,
  ref,
  useContext,
  useStore,
  watch,
} from "@nuxtjs/composition-api";
import useColors from "@/hooks/useColors";
import WaveSurfer from "wavesurfer.js";

const useWaveSurfer = (id, url, ownMessage) => {
  const wavesurfer = ref(null);
  const playing = ref(false);
  const ready = ref(false);
  const error = ref(false);
  const duration = ref("00:00");
  const seconds = ref(0);
  const store = useStore();
  const { getColor } = useColors();
  const { $moment } = useContext();

  const darkTheme = computed(() => {
    return store.getters["messenger/isDark"];
  });
  watch(darkTheme, () => {
    if (ready.value) init();
  });

  const secondsToMinutes = (v) => {
    return $moment("1900-01-01 00:00:00").add(v, "seconds").format("mm:ss");
  };

  function waveColor() {
    if (!ownMessage) return darkTheme.value ? "#444647" : "#d8d8d8";
    return getColor("skin-primary", 50);
  }

  function progressColor() {
    if (!ownMessage) return getColor("skin-primary");
    return "white";
  }

  function init(playAfterInit = false) {
    if (wavesurfer.value) {
      ready.value = false;
      wavesurfer.value.destroy();
      playing.value = false;
    }

    wavesurfer.value = new WaveSurfer.create({
      container: document.getElementById(id),
      height: 30,
      barWidth: 2,
      barRadius: 3,
      hideScrollbar: true,
      backed: "MediaElement",
      normalize: true,
      fillParent: true,
      partialRender: true,
      responsive: true,
      xhr: {
        cache: "default",
        method: "GET",
        redirect: "follow",
        referrer: "client",
      },
      waveColor: waveColor(),
      cursorWidth: 0,
      progressColor: progressColor(),
      barHeight: 1,
      barGap: 3,
    });

    wavesurfer.value.on("ready", () => {
      ready.value = true;
      seconds.value = wavesurfer.value.backend.getDuration();
      duration.value = secondsToMinutes(seconds.value);
      if (playAfterInit) play();
    });
    wavesurfer.value.on("error", () => {
      error.value = true;
    });

    wavesurfer.value.on("audioprocess", (val) => {
      let time = seconds.value - val.toFixed(0);
      duration.value = secondsToMinutes(time > 0 ? time : 0);
    });
    wavesurfer.value.on("seek", (position) => {
      let currentTime = position * seconds.value;
      duration.value = secondsToMinutes(seconds.value - currentTime.toFixed(0));
    });
    wavesurfer.value.load(url);
  }

  function play() {
    wavesurfer.value.play();
    playing.value = true;
  }

  function pause() {
    wavesurfer.value.pause();
    playing.value = false;
  }

  function destroy() {
    if (wavesurfer.value) wavesurfer.value.destroy();
    ready.value = false;

    ready.value = false;
    playing.value = false;
  }

  function toggle() {
    if (ready.value) {
      playing.value ? pause() : play();
    } else {
      init();
    }
  }

  return {
    init,
    play,
    pause,
    destroy,
    toggle,
    ready,
    duration,
    playing,
    error,
  };
};
export default useWaveSurfer;
