<template>
  <nuxt-link
      :to="{
      name: 'messenger-threads-thread-index-settings-bots-bot',
      params: { bot: bot.id },
      props: { bot },
    }"
      class="tw-flex tw-text-skin-base tw-font-display tw-space-x-3 tw-items-center tw-hover-scale-sm tw-cursor-pointer tw-bg-gray-100/50 dark:tw-bg-skin-background-200 tw-p-5 tw-rounded-xl tw-group"
  >
    <div class="tw-flex-shrink-0">
      <MessengerBaseAvatar :src="bot.avatar.sm" size="4" square/>
    </div>
    <div class="tw-flex-1 tw-flex tw-flex-col tw-justify-between">
      <div class="font-display">{{ bot.name }}</div>
      <div class="text-skin-secondary tw-text-xs tw-transition-defaults">
        <div class="tw-flex tw-justify-between tw-flex-col">
          <div class="tw-flex tw-mt-1 tw-text-skin-secondary">
            Enabled :
            <MessengerBaseIcon
                :class="bot.enabled ? 'tw-text-green-500' : 'tw-text-red-500'"
                :name="bot.enabled ? 'check' : 'close'"
                :size="4"
                class="ml-2"
            >
            </MessengerBaseIcon>
          </div>
        </div>
      </div>
    </div>
    <MessengerBaseIcon
        class="tw-h-4 tw-w-4 tw-text-skin-secondary/50 tw-opacity-0 group-hover:tw-opacity-100 tw-transform tw-translate-x-7 group-hover:tw-translate-x-0 tw-transition-defaults group-hover:text-skin-primary"
        name="arrow-right"
    >
    </MessengerBaseIcon>
  </nuxt-link>
</template>

<script>
export default {
  props: ["bot"]
}
</script>
