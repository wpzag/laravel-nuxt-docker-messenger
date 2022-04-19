<template>
  <div>
    <MessengerBaseIconButton
        :icon="icon"
        size="4"
        @click="toggleDownload"
    />

    <v-slide-y-reverse-transition>
      <div
          v-if="downloading"
          class="tw-absolute tw-items-center tw-flex tw-px-5 tw-inset-0 tw-bg-gray-100  tw-text-gray-700 dark:tw-text-white dark:tw-bg-skin-background-200 "
      >

        <v-progress-linear

            :size="100"
            :value="percentage"
            background-color="#d6d6d6"

            class="tw-h-5 tw-flex-1"

        >
          {{ percentage }} %
        </v-progress-linear>


        <MessengerBaseIconButton
            class="tw-text-skin-secondary/80 hover:tw-text-skin-primary"
            icon="close"
            size="5"
            @click="toggleDownload"
        />
      </div>
    </v-slide-y-reverse-transition>
  </div>

</template>
<script>
import useDownload from "@/hooks/useDownload"

export default {
  props: ["file", "name"],
  setup({file, name}) {
    const {toggleDownload, fileSize, downloading, success, percentage} =
        useDownload(file, name)
    return {
      toggleDownload,
      fileSize,
      downloading,
      success,
      percentage

    }

  },
  computed: {
    icon() {
      if (!this.downloading && !this.success) return "download"
      return "check"
    }
  }
}
</script>
