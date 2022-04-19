<template>


  <div v-if="$store.state.messenger.thread.message.reactions.reactionDialog"
       class="tw-absolute tw-inset-0 tw-bg-black/30  tw-z-50  tw-flex-center">
    <div class="tw-relative ">
      <VEmojiPicker
          v-click-outside="()=>$store.commit('messenger/thread/message/reactions/reactionDialog',{dialog:false,message:null})"
          :dark="$store.getters['messenger/isDark']"

          @select="submit"/>
      <div v-if="loading" class="tw-absolute tw-inset-0 tw-bg-black/50  tw-flex-center tw-z-[60]">
        <MessengerBaseLoader/>
      </div>
    </div>


  </div>

</template>

<script>
import {VEmojiPicker} from 'v-emoji-picker'

export default {
  data() {
    return {
      loading: false
    }
  },

  computed: {
    message() {
      return this.$store.state.messenger.thread.message.reactions.message
    }
  },
  components: {
    VEmojiPicker
  },

  methods: {
    ownReaction(selected) {
      selected = this.$messenger.joypixels.toShort(selected)
      if (
          this.message.reactions &&
          this.message.reactions.data[selected] &&
          this.message.reactions.data[selected].some(
              (el) => el.owner_id === this.$auth.user.id
          )
      ) {
        return true
      }
      return false
    },
    close() {
      this.$store.commit('messenger/thread/message/reactions/reactionDialog', {dialog: false, message: this.message})
    },
    async submit(selected) {
      this.loading = true

      selected = this.$messenger.joypixels.toShort(selected.data)
      let api = this.$api.messenger.messages
      if (
          this.message.reactions &&
          this.message.reactions.data[selected] &&
          this.message.reactions.data[selected].some(
              (el) => el.owner_id === this.$auth.user.id
          )
      ) {
        const ownEmoji = this.message.reactions.data[selected].find(
            (el) => el.owner_id === this.$auth.user.id
        )

        await api.removeReact(this.message.thread_id, this.message.id, ownEmoji.id)
        return this.$store.commit('messenger/thread/message/reactions/reactionDialog', {dialog: false, message: null})

      } else {
        await api.react(this.message.thread_id, this.message.id, selected)
        this.$store.commit('messenger/thread/message/reactions/reactionDialog', {dialog: false, message: null})

      }
      this.close()

      this.loading = false
    }
  }
}
</script>
