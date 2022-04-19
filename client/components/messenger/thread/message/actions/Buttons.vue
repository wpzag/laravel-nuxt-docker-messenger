<template>
  <div
      v-click-outside="()=>$emit('closed')"
      class=" tw-w-full  ssm:tw-py-3 ssm:tw-space-y-3  "

  >

    <MessengerThreadMessageActionsReact v-if="!ownMessage" v-bind="{ message, ownMessage }" @close="$emit('closed')"/>
    <MessengerThreadMessageActionsRemove v-if="(ownMessage || $store.getters['messenger/thread/settings/isAdmin'] ) "
                                         v-bind="{ message, ownMessage }"
                                         @close="$emit('closed')"/>
    <MessengerThreadMessageActionsEdit v-if="
    $store.state.messenger.config.messageEdits &&
    ownMessage &&
    message.type === 'text'
    " v-bind="{ message, ownMessage }" @close="$emit('closed')"/>
    <MessengerThreadMessageActionsReply v-bind="{ message, ownMessage }" @close="$emit('closed')"/>

  </div>
</template>
<script>
export default {
  props: ["message", "ownMessage"]

}
</script>
