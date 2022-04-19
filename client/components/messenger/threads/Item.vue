<template>

  <div

      :class="{
      'tw-bg-gray-100 dark:tw-bg-black/20 tw-rounded-xl hover:tw-translate-x-0':
       $route.params.thread && thread.id ===$route.params.thread,
    }"
      class="tw-flex tw-space-x-4 tw-border-b tw-border-skin-border/50 tw-transform tw-translate-x-0 tw-transition-transform tw-ease-out tw-duration-300 tw-cursor-pointer hover:tw-translate-x-2 tw-relative tw-group tw-px-3 tw-py-8 "
  >
    <span
        :class="thread.unread_count ? 'tw-bg-skin-primary' : 'tw-bg-transparent'"
        class="tw-absolute tw-inset-y-center tw-right-3 tw-font-bold tw-rounded-full tw-text-xs tw-p-1 tw-text-skin-primary"
    ></span>

    <div
        :class="{
        'group-hover:tw-opacity-100 group-hover:tw--translate-x-2':
          !thread.active,
      }"
        class="tw-absolute tw-left-0 tw-h-3 tw-w-1 tw-rounded tw-bg-skin-primary tw-transform tw-translate-x-4 tw-opacity-0 tw-transition-defaults tw-inset-y-center"
    >
    </div>
    <MessengerBaseAvatar :src="thread.avatar.sm" class="tw-flex-shrink-0" square/>

    <div class="tw-flex-1 tw-space-y-2">
      <span class="tw-text-sm tw-font-display tw-text-skin-base tw-font-bold">
        <span> {{ thread.name }}</span>
      </span>
      <div class="tw-flex tw-items-center tw-justify-between ">
        <span
            :class="
            thread.unread_count ? 'tw-text-skin-base ' : 'tw-text-skin-secondary'
          "
            class="tw-text-xs tw-truncate tw-w-40 smd:tw-w-32"
        >{{ body }}</span
        >
        <span
            :class="
            thread.unread_count ? 'tw-text-skin-base/70' : 'tw-text-skin-caption'
          "
            class="tw-text-xs "
        >{{ thread.timeAgo }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["thread"], computed: {
    body() {
      return this.$messenger.message.parseLatestMessage(this.thread)
    }
  }
}
</script>
