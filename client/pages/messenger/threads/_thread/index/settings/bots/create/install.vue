<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings.bots.create') "
                              :loading="$fetchState.pending"
                              name="Install A package">
    <div class=" tw-flex-center tw-flex-col ">
      <MessengerThreadSettingBotsInstallItem v-for="item in list" :key="$uuid()" :item="item"/>

    </div>
  </MessengerThreadSettingPage>
</template>
<script>
export default {
  data() {
    return {
      list: []
    }
  },

  async fetch() {
    this.list = await this.$api.messenger.bots.getPackages()
  }
}
</script>
