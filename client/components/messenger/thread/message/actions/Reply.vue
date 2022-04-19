<template>

  <MessengerThreadMessageActionsIcon icon="reply" name="Reply"
                                     @click="clicked"
  />

</template>
<script>

export default {
  props: ['message'], methods: {
    clicked() {
      this.$emit('close')
      this.$store.commit('messenger/thread/messages/reply_to', this.message)
    }
  }


}
</script>
