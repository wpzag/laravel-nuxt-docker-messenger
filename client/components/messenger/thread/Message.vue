<template>
  <div
  >

    <div :class="{'tw-flex-row-reverse ':ownMessage, 'tw-mt-4': length ===1&& ownMessage}"
         class=" tw-flex tw-items-center   "
         @mouseenter="hovered=true"
         @mouseleave="hovered=false">
      <div>
        <MessengerThreadMessageReplyToMessage v-if="message.reply_to" :message="message" :type="type"/>
        <div :class="{'tw-flex-row-reverse ':ownMessage}" class=" tw-flex tw-items-center   ">
          <div
              :class="{
      'tw-rounded-t-xl tw-rounded-r-xl  tw-rounded-tl-xl tw-rounded-bl':
        index === 0 && !ownMessage && length !==1,

        'tw-rounded-xl': length ===1 ,

      'tw-rounded-t-xl tw-rounded-l-xl tw-rounded-tr-xl tw-rounded-br':
        index === 0 && ownMessage && length !==1,

      'tw-rounded-r-xl tw-rounded-l':
        index !== 0 && index !== length-1 && !ownMessage,
      'tw-rounded-l-xl tw-rounded-r':
        index !== 0 && index !== length-1 && ownMessage,

      'tw-rounded-b-xl  tw-rounded-r-xl':
        index === length - 1 && !ownMessage && length !== 1,
      'tw-rounded-b-xl tw-rounded-l-xl':
        index === length - 1 && ownMessage && length !==1 ,

      'tw-my-1': type === 'image' ||type === 'video' || type === 'code' && message.reply_to ===null,
      'tw-max-w-[24rem]  tw-min-w-[20rem]':  type === 'file' ||type === 'voice' ||type === 'audio',
      'tw-w-[24rem] ': type === 'youtube'  ,

      'tw-bg-skin-primary  tw-text-white ':
        ownMessage && ['text', 'wiki', 'audio', 'voice','file'].includes(type),

      'tw-float-right ':
        ownMessage  ,
         'tw-bg-gray-100/80  tw-text-gray-700 dark:tw-text-white/90    dark:tw-bg-skin-background-200 ':
        !ownMessage &&
        ['text', 'wiki', 'file', 'audio', 'voice'].includes(type),
    }"
              class="   tw-transition-fix tw-overflow-hidden tw-relative"
          >
            <component :is="messageBody" v-bind="{ message, ownMessage }"/>

          </div>
          <div v-if="message.loading && message.type !== 'gif'" class="tw-mx-2 tw-self-end ">
            <v-progress-circular color="grey" indeterminate size="10" width="1"></v-progress-circular>
          </div>
          <MessengerThreadMessageActionsSection
              v-bind="{ message, ownMessage ,index,length,groupsLength,groupIndex,hovered}"/>

        </div>
      </div>

    </div>


    <MessengerThreadMessageReactions v-bind="{ message, ownMessage }"/>


  </div>


</template>

<script>
export default {
  props: ["type", "message", "index", "groupsLength", "groupIndex", "length", "ownMessage"],
  data() {
    return {
      hovered: false

    }
  },

  mounted() {
    this.$messenger.scrollToBottom()
  },
  computed: {
    messageBody() {
      return {
        text: "MessengerThreadMessageText",
        file: "MessengerThreadMessageFile",
        code: "MessengerThreadMessageCode",
        image: "MessengerThreadMessageImage",
        wiki: "MessengerThreadMessageWiki",
        audio: "MessengerThreadMessageAudio",
        voice: "MessengerThreadMessageVoice",
        video: "MessengerThreadMessageVideo",
        youtube: "MessengerThreadMessageYoutube",
        gif: "MessengerThreadMessageGif"
      }[this.type]
    }
  }
}
</script>
