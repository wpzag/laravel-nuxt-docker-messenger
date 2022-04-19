<template>
  <div
      class="   tw-border-b tw-border-dashed tw-border-skin-border tw "
  >
    <div class="tw-flex tw-space-x-4 tw-items-center tw-py-4   tw-cursor-pointer" @click="expand=!expand">
      <MessengerBaseAvatar :src="item.avatar.sm" class="tw-flex-shrink-0" square/>
      <div>
        <div class="tw-font-bold tw-text-skin-base/80">{{ item.name }}</div>
        <div class="tw-text-skin-base/40 tw-text-sm">{{ item.description }}</div>
      </div>
    </div>
    <v-expand-transition>
      <div v-if="expand" class="tw-space-y-8 ">
        <MessengerThreadSettingBotsInstallActionsCollection v-if="item.installs.length" :items="item.installs"
                                                            name="Installs"/>
        <MessengerThreadSettingBotsInstallActionsCollection v-if="item.already_installed.length"
                                                            :items="item.already_installed"
                                                            name="Already Installed"/>
        <div class="tw-flex-center tw-pb-8 ">
          <MessengerBaseBtn :loading="loading" bgColor="tw-bg-green-600"
                            class="tw-hover-scale-sm tw-transition-defaults" @click="submit">
            Install {{
              item.name
            }}
          </MessengerBaseBtn>
        </div>
      </div>
    </v-expand-transition>


  </div>
</template>
<script>
export default {
  props: ['item'], data() {
    return {
      expand: false,
      loading: false
    }
  }, methods: {
    async submit() {
      this.loading = true
      const bot = await this.$api.messenger.bots.installPackage(this.item.alias)
      this.$toast.success('You have successfully installed ' + this.item.name + ' Package !')
      this.loading = false
      // console.log(this.$messenger.to)
      // this.$messenger.to('thread-settings', '/bots/' + bot.id)
      await this.$router.push({
        name: 'messenger-threads-thread-index-settings-bots-bot',
        params: {bot: bot.id},
        props: {bot}
      })
    }
  }

}
</script>
