<template>
  <MessengerBasePage title="Messenger Settings">

    <div class="tw-flex-center tw-flex-col">


      <MessengerBaseAvatarUploader v-if="$auth.user.avatar" :size="10" :src="$auth.user.avatar.md"

                                   endpoint="/messenger/avatar"
                                   @uploaded="uploaded"

      />
      <div class="tw-font-bold ">{{ $auth.user.name }}</div>
      <div class="tw-p-5 tw-my-5 tw-bg-gray-100 dark:tw-bg-skin-background-200 tw-rounded-xl">
        <MessengerBaseIconButton
            :bgColor="options.online_status===2?'tw-bg-gray-200 dark:tw-bg-skin-background-800':''"
            icon="clock"
            name="Away" size="6" textColor="tw-text-orange-500"
            @click="options.online_status=2"/>
        <MessengerBaseIconButton
            :bgColor="options.online_status===1?'tw-bg-gray-200 dark:tw-bg-skin-background-800':''"
            icon="wifi"
            name="Online" size="6" textColor="tw-text-green-500"
            @click="options.online_status=1"/>
        <MessengerBaseIconButton
            :bgColor="options.online_status===0?'tw-bg-gray-200 dark:tw-bg-skin-background-800':''"
            icon="eye-off"
            name="Offline" size="6" textColor="tw-text-gray-500"
            @click="options.online_status=0"/>
      </div>
      <div class="tw-bg-gray-100 dark:tw-bg-skin-background-200  tw-rounded-xl tw-px-20 tw-py-10 tw-mb-5">
        <div class="tw-text-center tw-text-skin-secondary">- Options -</div>
        <v-checkbox
            v-for="(option, index) in options"
            v-if=" !['online_status','dark_mode'].includes(index)"
            :key="$uuid()"
            v-model="options[index]"
            :checked="option"
            :label="getOptionName(index)"
            hide-details
        />
      </div>
      <div>
        <MessengerBaseBtn :loading="loading" size="lg" @click="submit">Update Settings</MessengerBaseBtn>
      </div>
    </div>


  </MessengerBasePage>

</template>
<script>
export default {
  layout: "messenger",
  data() {
    return {
      loading: false,
      options: {
        message_popups: true,
        message_sound: true,
        call_ringtone_sound: true,
        notify_sound: true,
        online_status: 1,
        dark_mode: false
      }
    }
  }, mounted() {
    for (let item in this.$store.state.messenger.settings) {
      if (this.options.hasOwnProperty(item)) this.options[item] = this.$store.state.messenger.settings[item]
    }
  },
  methods: {
    getOptionName(name) {
      return name.split(' ')
          .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
          .join(' ').replace('_', " ")
    }, async submit() {
      this.loading = true
      const settings = await this.$api.messenger.base.updateSettings(this.options)
      this.$store.commit('messenger/settings', settings)
      this.loading = false
      this.$toast.success('You have updated the messenger settings successfully !')
    },
    uploaded(user) {
      this.$auth.setUser({
        ...this.$auth.user,
        avatar: user.owner.avatar
      })
    }
  }
}
</script>
