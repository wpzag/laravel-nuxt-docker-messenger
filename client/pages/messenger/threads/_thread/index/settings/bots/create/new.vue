<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings.bots')"

                              name="Create Bot">


    <v-text-field
        :error-messages="form.errors.errors['name']"

        outlined label="Bot Name" v-model="form.name"/>
    <v-text-field
        :error-messages="form.errors.errors['cooldown']"

        outlined
        label="Cooldown (in seconds)"
        type="number"
        v-model="form.cooldown"
    />

    <v-switch
        class="tw-block"
        :error-messages="form.errors.errors['enabled']"

        :color="form.enabled ? 'success' : 'error'"
        v-model="form.enabled"
        inset
        label="Enabled"
    />

    <v-switch
        class="tw-block"
        :error-messages="form.errors.errors['hide_actions']"

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
      >Create bot
      </MessengerBaseBtn>

    </div>

  </MessengerThreadSettingPage>
</template>
<script>

export default {
  data() {
    return {

      form: this.$vform({
        name: '',
        cooldown: 0,
        enabled: true,
        hide_actions: false
      })
    }
  },

  methods: {
    async submit() {
      await this.form.post(
          `/messenger/threads/${this.$route.params.thread}/bots`
      )
      this.$messenger.to('threads.current.settings.bots')

      this.$toast.success('You have created this bot successfully!')
    }
  }
}
</script>
