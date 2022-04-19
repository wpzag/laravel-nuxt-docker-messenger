<template>

  <MessengerThreadMessageActionsIcon :loading="loading" icon="trash"
                                     name="Delete Message" @click="removeMessage"/>

</template>
<script>

export default {
  props: ['message', 'ownMessage'],
  data() {
    return {
      loading: false
    }
  },

  methods: {
    async removeMessage() {
      this.$emit('close')
      this.$swal('Success!', 'Transaction was successful', 'success')
      await this.$messenger.confirmAlert('Are you sure you want to delete this message',
          () => this.loading = true,
          () => this.$store.dispatch('messenger/thread/messages/destroy', this.message),
          () => this.loading = false,
          () => this.loading = false
      )
      this.loading = false

    }
  }
}
</script>
