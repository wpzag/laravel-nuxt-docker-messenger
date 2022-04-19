<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings')" :loading="$fetchState.pending"
                              name="Members">


    <div class="tw-space-y-3 tw-mt-6">
      <MessengerThreadSettingPageHeader
          v-if="meta"
          :title="`Total : ${meta.total}`"
          icon="plus"
          @clicked="$store.commit('messenger/dialogs/addParticipant',{show:true})"
      />
      <MessengerThreadSettingParticipantsItem
          v-for="participant in participants"
          :key="participant.id"
          v-bind="{ participant }"
      />
    </div>
  </MessengerThreadSettingPage>
</template>
<script>

export default {
  data() {
    return {
      participants: [],
      meta: null
    }
  },

  async fetch() {
    // this.$store.commit('messenger/thread/participants/reset')

    // await this.$store.dispatch('messenger/thread/participants/fetch')

    this.participants = this.$store.state.messenger.thread.participants.list
    this.meta = this.$store.state.messenger.thread.participants.meta
  }

}
</script>

<style></style>
