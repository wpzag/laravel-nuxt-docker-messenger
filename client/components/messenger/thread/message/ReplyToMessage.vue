<template>
  <div
      :class="{'tw-max-w-[24rem] tw-min-w-[20rem]':type === 'file' ||type === 'voice' ||type === 'audio',
             'tw-max-w-[15rem]':type === 'text'
             }"
      :style="message.extra && message.extra.dimensions?`width:${$messenger.message.getDimensions(message).width}px`:`width:auto`"
      class=" tw-border-l tw-border-gray-400 dark:tw-border-gray-600  tw-border-l-4 tw-px-3 tw-mb-1 tw-mt-2 ">
    <div class="tw-opacity-80">Replying to {{ message.reply_to.owner.name }}</div>
    <div v-if=" message.reply_to.type === 'text'" class="tw-opacity-40 tw-truncate"
         v-html="$messenger.message.parse(message.reply_to)"></div>
    <div v-else class="tw-text-skin-secondary  tw-space-x-2 tw-flex tw-items-center">
      <MessengerBaseIcon name="attachment" size="3"/>
      <div>attachment</div>

    </div>

  </div>
</template>
<script>
export default {
  props: ['message', 'type']
}
</script>
