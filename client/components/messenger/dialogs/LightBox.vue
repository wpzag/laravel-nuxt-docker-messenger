<template>
  <div

      class="tw-fixed tw-inset-0 tw-bg-black tw-z-[100] tw-flex-center"
  >


    <MessengerBaseLoader v-if="loading" class="tw-text-white tw-fixed tw-inset-center"/>
    <v-img v-if="['image','gif','wiki'].includes($store.state.messenger.dialogs.lightbox.type)"
           :class="loading ? 'tw-opacity-0 tw-translate-y-4': 'tw-opacity-1 tw-translate-y-0'"
           :src="$store.state.messenger.dialogs.lightbox.src"
           class="tw-transform tw-h-full tw-transition-defaults" contain
           @load="loading=false"/>

    <vue-plyr v-else>
      <video
          controls
          crossorigin
          playsinline
          preload="metadata"


      >
        <source
            :src="$store.state.messenger.dialogs.lightbox.src"
            type="video/mp4"
        />
      </video>

    </vue-plyr>

    <a
        class="tw-cursor-pointer tw-text-black tw-fixed tw-top-10 tw-right-10 tw-bg-gray-700/80 tw-rounded-full tw-p-3 tw-z-50 tw-transition-defaults hover:tw-bg-white"
        @click.prevent="$store.commit('messenger/dialogs/hideLightBox')"
    >
      <MessengerBaseIcon :size="14" name="close"/>
    </a>

  </div>

</template>
<script>
export default {
  data() {
    return {
      loading: true
    }
  }


}
</script>
