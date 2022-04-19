<template>

  <section

      class=" tw-flex tw-relative tw-flex-auto tw-flex tw-flex-col  tw-bg-skin-background-800">


    <v-slide-y-transition>
      <MessengerDialogsReactionPicker v-if="$store.state.messenger.thread.message.reactions.reactionDialog"/>

    </v-slide-y-transition>
    <v-slide-y-transition>
      <MessengerDialogsFileViewer v-if="$store.state.messenger.thread.uploads.fileViewer"/>

    </v-slide-y-transition>


    <v-slide-y-transition>
      <MessengerBaseImageEditor v-if="$store.state.messenger.thread.uploads.imageEditor"
                                :src="$store.state.messenger.thread.uploads.url"
                                @closed="imageEditorClosed"
                                @submit="submit"/>

    </v-slide-y-transition>

    <MessengerThreadLoading

        v-if="$store.state.messenger.activeThread.loading"
        class="tw-absolute  tw-inset-0 tw-z-20"
    />
    <template>
      <MessengerThreadHeader/>
      <NuxtChild/>

      <v-fade-transition :duration="300">
        <div
            v-if="$route.name.includes('setting')"
            class="tw-fixed-overlay-full"
            @click="close"
        />
      </v-fade-transition>
      <MessengerThreadContent/>

      <MessengerThreadFooter v-if="canMessage"/>
    </template>

  </section>


</template>
<script>


export default {

  mounted() {

    // if (window.history.length !== 1) return
    // console.log('asdasdasdas')
    if (this.$nuxt.context.from?.name === 'messenger-threads' && !this.$route.params.thread.includes('user')) return
    // if (this.$messenger.activeThread()) return
    if (this.$route.params.thread.includes('user')) {
      const id = this.$route.params.thread.replace('user=', '')
      if (id === '') return this.$messenger.to('threads')

      this.$store.dispatch("messenger/activeThread/create", id)
    } else {
      this.$store.dispatch('messenger/activeThread/update', this.$route.params.thread)

    }

  }, computed: {
    canMessage() {
      return this.$store.state.messenger.activeThread.permissions.message || this.$messenger.activeThread()?.newThread
    }
  }, methods: {
    submit({image, blob, dimensions}) {
      this.$store.dispatch('messenger/thread/uploads/uploadImage', {image, blob, dimensions})
    }, imageEditorClosed() {
      this.$store.commit('messenger/thread/uploads/reset')
    },
    close() {
      setTimeout(() => {
        this.$store.commit('messenger/thread/filesWidget/type', 'images')
        this.$store.commit('messenger/thread/filesWidget/reset')
        this.$store.dispatch('messenger/thread/filesWidget/fetch', {type: 'images'})
      }, 200)

      this.$messenger.to('threads.current', true)
    }
  }
}
</script>
