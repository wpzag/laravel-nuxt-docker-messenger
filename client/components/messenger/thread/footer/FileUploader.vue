<template>
  <div>
    <input
        v-show="false"
        ref="input"
        :accept="ext"
        type="file"
        @change="submit"
    />
    <MessengerThreadFooterButton v-tippy class="tw-text-skin-primary hover:tw-text-skin-primary-500/80"
                                 content="File" icon="file"
                                 name="File"
                                 @click="$refs.input.click()"
    />


  </div>
</template>
<script>
export default {
  props: ["size", "src"],
  computed: {
    ext() {

      return this.$store.state.messenger.config.messageVideoMimeTypes.split(',').map(el => '.' + el).join(',') + ',' +
          this.$store.state.messenger.config.messageAudioMimeTypes.split(',').map(el => '.' + el).join(',') + ',' +
          this.$store.state.messenger.config.messageDocumentMimeTypes.split(',').map(el => '.' + el).join(',') + ','
    }
  },

  methods: {
    submit(event) {

      let file = event.target.files[0]
      this.$refs.input.value = ''

      this.$store.dispatch('messenger/thread/uploads/upload', file)
    }
  }
}
</script>
