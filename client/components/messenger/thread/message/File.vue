<template>
  <div class="tw-py-3 tw-px-4 tw-flex tw-items-center tw-space-x-4 ">
    <MessengerBaseIcon :class="ownMessage?'':'tw-text-skin-primary'" name="file" size="6"/>
    <div class="tw-min-w-0 tw-flex-1 overflow-hidden">
      <div
          class="tw-transition-defaults tw-truncate  tw-cursor-pointer tw-transform "
          @click="expanded = !expanded"
      >
        <div>
          {{ message.body }}+asdasdasdasdassdasdasd
        </div>
        <v-expand-transition>
          <div v-if="expanded">
            <div :class="ownMessage? 'tw-text-white/70' : 'tw-text-skin-secondary' " class="tw-text-sm  ">
              <div>{{ fileSize }}</div>
              <div v-if="message.owner">Owner : {{ message.owner.name }}</div>

            </div>
          </div>
        </v-expand-transition>
      </div>
    </div>

    <MessengerThreadMessageDownloadButton :file="message.document" :name="message.body"/>

  </div>
</template>
<script>

import useDownload from "~/hooks/useDownload"

export default {
  props: ["message", "ownMessage"],
  setup({message}) {
    const {fileSize} =
        useDownload(message.document, message.body)
    return {fileSize}
  },
  data() {
    return {
      expanded: false,
      downloadPanel: false
    }
  }, watch: {
    expanded(newValue, oldValue) {
      setTimeout(() => this.$messenger.scrollToBottom(false, true)
          , 30)
    }
  }
}
</script>
