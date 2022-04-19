<template>
  <MessengerThreadMessageActionsIcon icon="edit" name="Edit Message"
                                     @click="clicked"
  />


</template>
<script>

export default {
  props: ['message'], methods: {
    clicked() {
      this.$emit('close')
      this.$store.commit('messenger/dialogs/editMessage', {message: this.message, show: true})
    }
  }


}
</script>
