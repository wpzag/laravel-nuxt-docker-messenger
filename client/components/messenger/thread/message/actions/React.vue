<template>

  <MessengerThreadMessageActionsIcon icon="emoji" name="React"
                                     @click="clicked()"
  />


</template>
<script>
export default {
  props: ['message'],
  methods: {
    clicked() {
      this.$store.commit('messenger/thread/message/reactions/reactionDialog', {dialog: true, message: this.message})
      this.$emit('close')
    }
  }
}
</script>
