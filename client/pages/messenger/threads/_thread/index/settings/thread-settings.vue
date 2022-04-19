<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings')" :loading="$fetchState.pending"
                              class="space-y-4"
                              name="Chat Settings">
    <div class="tw-space-y-4 tw-flex tw-flex-col tw-items-center tw-w-full">
      <MessengerBaseAvatarUploader
          :endpoint="`/messenger/threads/${$route.params.thread}/avatar`"
          :size="7"
          :src="avatar"
          @uploaded="uploaded"
      />

      <v-text-field
          v-model="opts.name"
          class="tw-w-full"
          hide-details
          label="Group Name"
          outlined
      />
      <div class="tw-w-full">
        <v-checkbox
            v-for="(option, index) in opts"
            v-if=" visible(index)"
            :key="$uuid()"
            v-model="opts[index]"
            :checked="option"
            :label="getOptionName(index)"
            hide-details

        />


      </div>

      <MessengerBaseBtn
          :loading="loading"
          class="tw-bg-skin-primary tw-hover-scale-sm tw-self-end  tracking-wider"
          size="lg"
          @click="submit"
      > Save settings
      </MessengerBaseBtn>


    </div>


  </MessengerThreadSettingPage>
</template>
<script>
import {mapState} from "vuex"

export default {
  data() {
    return {
      loading: false,
      opts: {
        name: null,
        avatar: {sm: null, md: null, lg: null},
        add_participants: false,
        invitations: true,
        calling: true,
        messaging: true,
        chat_bots: false,
        knocks: true
      }
    }
  },

  async fetch() {
    await this.$store.dispatch('messenger/thread/settings/fetch')
    this.opts = this.options
  }, computed: {
    ...mapState("messenger/thread/settings", ["options"]),
    avatar() {
      return this.$store.state.messenger.activeThread.thread.avatar.md
    }
  },


  methods: {
    visible(index) {
      if (['name', 'avatar'].includes(index)) return false
      return {
        chat_bots: this.$store.state.messenger.config['bots'],
        invitations: this.$store.state.messenger.config['threadInvites'],
        calling: this.$store.state.messenger.config['calling'],
        knocks: this.$store.state.messenger.config['knockKnock']
      }[index] ?? true
    },
    getOptionName(name) {
      return name.split(' ')
          .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
          .join(' ').replace('_', " ")
    },
    uploaded(data) {
      let avatar = data.avatar
      this.$store.commit('messenger/activeThread/avatar', avatar)
      this.$store.commit('messenger/threads/avatar', {id: this.$messenger.activeThreadId(), avatar})
    },
    async submit() {
      this.loading = true
      await this.$store.dispatch('messenger/thread/settings/update', this.options)
      this.loading = false

    }
  }
}
</script>
