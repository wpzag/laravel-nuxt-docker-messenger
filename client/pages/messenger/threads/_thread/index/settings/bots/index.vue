<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings')" :loading="$fetchState.pending"
                              name="Bots">
    <MessengerThreadSettingPageHeader
        :link=" $messenger.path('threads.current.settings.bots.create')"
        icon="plus"
        title=" "
    />


    <MessengerThreadSettingEmptyList
        v-if="bots.length === 0"
        :link="$messenger.path('threads.current.bots.create')"
        content=" This chat doesn't have any bots"
        icon="bot"
    />


    <div v-else class="tw-space-y-3 tw-mt-6">

      <MessengerThreadSettingBotsItem v-for="bot in bots" :key="bot.id" v-bind="{ bot }"/>

    </div>
  </MessengerThreadSettingPage>
</template>
<script>

export default {

  data() {
    return {
      bots: []
    }
  }, async fetch() {
    this.bots = await this.$api.messenger.bots.index()
  }
}
</script>
