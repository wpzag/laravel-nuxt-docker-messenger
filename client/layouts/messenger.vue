<template>
  <v-app v-if="$store.state.messenger.init ">

    <div
        :style="{height:$store.state.messenger.windowHeight+'px'}"
        class=" tw-w-screen cover-full tw-font-body tw-text-skin-base "
    >

      <div

          class="tw-flex tw-h-full  overflow-hidden smd:tw-flex-col smd:tw-flex-col-reverse tw-w-screen tw-bg-skin-background-800">
        <MessengerSideMenuLayout class="tw-bg-skin-background-200"/>

        <LazyMessengerDialogsAll/>

        <Nuxt/>
      </div>

    </div>
  </v-app>
</template>
<script>
export default {
  data() {
    return {

      visible: false
    }
  },

  mounted() {
    this.$store.dispatch('messenger/init')

  }
}
</script>
