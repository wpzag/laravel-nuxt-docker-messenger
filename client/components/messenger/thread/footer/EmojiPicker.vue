<template>
  <div ref="container"
       class="tw-absolute tw-inset-y-center tw-right-4  hover:tw-text-skin-primary-500/80"
  >
    <MessengerThreadFooterButton
        :class="show?'tw-text-skin-base':'tw-text-skin-primary'"
        icon="emoji"
        @click="clicked"
    />

    <v-slide-y-transition>
      <VEmojiPicker v-if="show" v-click-outside="()=> {show=false}" :dark="$store.getters['messenger/isDark']"
                    class="tw-absolute  z-50 tw--top-[28.5rem] tw--right-1   " @select="selected"/>

    </v-slide-y-transition>

  </div>
</template>
<script>
import {VEmojiPicker} from 'v-emoji-picker'

export default {
  name: 'emoji-picker',
  data() {
    return {
      show: false
    }
  },
  components: {VEmojiPicker},
  methods: {
    selected(i) {
      this.$emit('selected', i)
    }, clicked() {
      this.show = !this.show
    }
  }
}
</script>


