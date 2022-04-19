<template>
  <div>
    <div
        v-for="(group, groupIndex) in messages"
        :key="groupIndex"
        :class="group.ownMessage ? 'tw-justify-end' : 'tw-justify-start'"
        class=" tw-flex tw-flex-row ms-message  tw-my-6"
    >
      <template v-if="group.system_message">
        <MessengerThreadMessageSystem :message="group.messages[0]"/>
      </template>
      <template v-else>
        <div
            v-if="!group.ownMessage "
            class="tw-relative tw-flex tw-flex-shrink-0 tw-mr-4 smd:tw-mr-2 tw-items-end"
        >
          <MessengerBaseAvatar :size="$vuetify.breakpoint.mobile?1.5:'2.2'" :src="group.owner.avatar.sm"/>
          <!--            <div :style="` background: url(${group.owner.avatar.sm})  no-repeat center center`"-->
          <!--                 class="tw-bg-cover tw-relative tw-rounded-full tw-w-9 tw-h-9 tw-bg-gray-200 dark:tw-bg-skin-background-800/60  ">-->

          <!--            </div>-->

        </div>
        <div class="tw-text-sm  tw-space-y-0.5 ">
           <span
               v-if="!group.ownMessage"
               class=" tw-text-gray-400  tw-ml-2 tw-text-xs "
           >{{ group.owner.name }}</span
           >
          <span
              v-if="!group.ownMessage"

              class="tw-text-skin-secondary/60 tw-text-xs tw-mx-1 tw-opacity-0 ">{{
              $moment(group.messages[0].created_at).fromNow()
            }} </span>


          <div v-for="(message, index) in group.messages" :key="index"
               :class="{ 'tw-flex-row-reverse': group.ownMessage }"
               class="tw-flex tw-items-center tw-group tw-relative ">

            <div v-if="replay_to && replay_to.id === message.id" :id="`reply-${message.id}`"
                 class='tw-w-2 tw-h-5 tw-rounded-xl tw-mx-4 tw-bg-skin-primary'></div>


            <MessengerThreadMessage
                :id="`message-${message.id}`"
                :groupIndex="groupIndex"
                :groupsLength="messages.length"
                :index="index"
                :length="group.messages.length"
                :message="message"
                :own-message="group.ownMessage"
                :type="message.type"
            />


          </div>

        </div>
      </template>

    </div>


  </div>


</template>
<script>
export default {
  props: ['messages'],

  computed: {
    replay_to() {
      return this.$store.state.messenger.thread.messages.replay_to
    },
    fetchingMore() {
      return this.$store.state.messenger.thread.messages.fetchingMore
    }
  }, updated() {
    this.$nextTick(() => {

      if (this.fetchingMore) {
        this.$emit('more')
        this.$store.commit('messenger/thread/messages/fetchingMore', false)

      }

      // Code that will run only after the
      // entire view has been re-rendered
    })
  }
}
</script>
