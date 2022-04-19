<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings.bots')" :loading="$fetchState.pending"
                              name="Manage Bot">
    <template v-if="bot">
      <div class="tw-border-skin-background-400 tw-my-4 tw-p-1 tw-border-4">
        <div
            class="tw-text-skin-secondary tw-p-6 tw-bg-light-gray tw-rounded tw-flex-center tw-flex-col tw-text-xs"
        >
          <MessengerBaseAvatarUploader :size="7" :src="bot.avatar.sm"
                                       :endpoint="`/messenger/threads/${$route.params.thread}/bots/${$route.params.bot}/avatar`"/>

          <div class="tw-font-display tw-text-base tw-text-skin-base/60">
            {{ bot.name }}
          </div>
          <div
              :class="bot.enabled ? 'tw-text-green-500' : 'tw-text-red-500'"
              class="tw-mb-4"
          >
            {{ bot.enabled ? "Enabled" : "Disabled" }}
          </div>
          <div class="tw-flex tw-space-x-3">
            <div class="tw-p-3 tw-bg-gray-100 dark:tw-bg-skin-background-400 tw-rounded-xl">
              By: {{ bot.owner.name }}
            </div>
            <div class="tw-p-3 tw-bg-gray-100 dark:tw-bg-skin-background-400 tw-rounded-xl">
              Cooldown : {{ bot.cooldown }}
            </div>
          </div>

          <div class="tw-flex-center tw-space-x-2 tw-mt-3">
            <MessengerBaseIconButton
                :size="4"
                class="text-skin-primary"
                icon="edit"
                name="Edit"
                @click="$messenger.to('threads.current.settings.bots.current.edit')"
            />
            <MessengerBaseIconButton
                @click="remove"
                :loading="removeLoading"
                :size="4"
                bgColor="tw-bg-skin-background-200"
                textColor="tw-text-red-500"
                icon="trash"
                name="Delete"
            />
          </div>
        </div>
      </div>
      <MessengerThreadSettingPageHeader
          :link="{ name: 'messenger-threads-thread-index-settings-bots-bot-actions-create' }"
          :title="`Actions : ${bot.actions.length || 0}`"
          class="tw-bg-light-gray tw-p-4 tw-rounded"
          icon="plus"
      />
      <div class="tw-space-y-4">
        <div v-for="action in bot.actions" :key="action.id">
          <MessengerThreadSettingBotsActionItem :action="action"/>
        </div>
      </div>
    </template>

  </MessengerThreadSettingPage>
</template>
<script>

export default {

  data() {
    return {
      bot: null,
      removeLoading: false
    }
  }, async fetch() {
    this.bot = await this.$api.messenger.bots.find(this.$route.params.bot)
  }, methods: {
    async remove() {

      this.removeLoading = true
      await this.$messenger.confirmAlert(`Are you sure you want to remove ${this.bot.name} bot ?`,
          () => this.removeLoading = true,
          () => this.$api.messenger.bots.destroy(this.bot.id),
          () => {
            this.removeLoading = false
            this.$messenger.to('threads.current.settings.bots')
          },
          () => this.removeLoading = false
      )


    }
  }
}
</script>
