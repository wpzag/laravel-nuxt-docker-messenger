<template>
  <div
  >
    <component :is="collection" :list="list" :unlisted="unlisted"/>
    <v-slide-y-transition>
      <div
          class="tw-absolute tw--bottom-9 tw--translate-x-1/2 tw-left-1/2 tw-h-3"
      >
        <MessengerBaseLoader
            v-if="loading"
            classes="tw-text-gray-400 dark:tw-text-gray-800"
            size="15"
        />
      </div>
    </v-slide-y-transition>
    <div v-if="!loading && !list.length" class="tw-flex-center tw-mt-4 tw-text-center tw-text-skin-secondary">
      <div>
        <MessengerBaseIcon name="face" size="5"></MessengerBaseIcon>
      </div>
      This thread doesnt have any {{ type }} yet !
    </div>
    <MessengerThreadSettingMainFilesViewAll
        v-if="!['images','videos'].includes(type) && !loading && (!loaded || unlisted.length)"
        @clicked="
        $store.dispatch('messenger/thread/filesWidget/more')
      "
    />
  </div>
</template>
<script>
import {mapState} from "vuex"

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("messenger/thread/filesWidget", [
      "list", "type", "loading", "loaded", "unlisted"

    ]),

    collection() {
      return {
        images: "MessengerThreadSettingMainFilesImageCollection",
        videos: "MessengerThreadSettingMainFilesVideoCollection",
        documents: "MessengerThreadSettingMainFilesDocumentCollection",
        audio: "MessengerThreadSettingMainFilesAudioCollection"

      }[this.type]
    },
    widgetExpanded() {
      return this.$store.state.messenger.thread.filesWidget.expanded
    },
    type() {
      return this.$store.state.messenger.thread.filesWidget.type
    }
  }
}
</script>
