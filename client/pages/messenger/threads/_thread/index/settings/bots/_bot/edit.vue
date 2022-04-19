<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings.bots.current')"
                              :loading="$fetchState.pending"
                              name="Edit Bot">
    <div class="tw-flex-center tw-mb-8">
      <MessengerBaseAvatarUploader v-if="bot" :size="7" :src="bot.avatar.sm"
                                   :endpoint="`/messenger/threads/${$route.params.thread}/bots/${$route.params.bot}/avatar`"/>

    </div>


    <v-text-field outlined label="Bot Name" v-model="form.name"/>
    <v-text-field
        outlined
        label="Cooldown (in seconds)"
        type="number"
        v-model="form.cooldown"
    />

    <v-switch
        class="tw-block"
        :color="form.enabled ? 'success' : 'error'"
        v-model="form.enabled"
        inset
        label="Enabled"
    />

    <v-switch
        class="tw-block"

        :color="form.hide_actions ? 'success' : 'error'"
        v-model="form.hide_actions"
        inset
        label="Hide Actions"
    />
    <div class="tw-text-right">
      <MessengerBaseBtn
          :loading="form.busy"
          size="lg"
          @click="submit"
      >Update bot
      </MessengerBaseBtn>

    </div>

  </MessengerThreadSettingPage>
</template>
<script>

export default {
  data() {
    return {
      bot: null,
      form: this.$vform({
        name: '',
        cooldown: 0,
        enabled: true,
        hide_actions: false
      })
    }
  },
  async fetch() {
    const data = await this.$axios.$get(
        `/messenger/threads/${this.$route.params.thread}/bots/${this.$route.params.bot}`
    )
    this.loading = false
    this.bot = data
    this.form.name = this.bot.name
    this.form.cooldown = this.bot.cooldown
    this.form.enabled = this.bot.enabled
    this.form.hide_actions = this.bot.hide_actions
  },

  methods: {
    async submit() {
      await this.form.put(
          `/messenger/threads/${this.$route.params.thread}/bots/${this.$route.params.bot}`
      )
      this.$messenger.to('threads.current.settings.bots.current')

      this.$toast.success('You have updated this bot successfully!')
    }
  }
}
</script>
