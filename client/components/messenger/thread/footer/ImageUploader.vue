<template>
  <div>
    <input
        v-show="false"
        ref="input"
        :accept="$store.state.messenger.config.messageImageMimeTypes.split(',').map(el => '.' + el).join(',')"
        type="file"
        @change="submit"
    />
    <MessengerThreadFooterButton v-tippy class="tw-text-skin-primary hover:tw-text-skin-primary-500/80"
                                 content="Image" icon="image"
                                 @click="$refs.input.click()"
    />


  </div>
</template>
<script>
export default {
  props: ["size", "src"],

  methods: {
    submit(event) {
      let file = event.target.files[0]


      this.$store.dispatch("messenger/thread/uploads/upload", file)

    }
  }
}
</script>
