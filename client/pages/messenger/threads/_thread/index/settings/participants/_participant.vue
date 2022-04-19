<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings.participants') "
                              :loading="$fetchState.pending"
                              class="tw-relative" name="Edit Member">
    <div v-if="!$fetchState.pending">
      <div
          class="tw-border-gray-50 dark:tw-border-skin-background-200 tw-my-4 tw-p-1 tw-border-4">
        <div
            class="tw-text-sm tw-text-skin-secondary tw-p-6 tw-bg-gray-50 dark:tw-bg-skin-background-200 tw-rounded tw-flex-center tw-flex-col tw-space-y-4"
        >

          <MessengerBaseAvatar
              :size="7"
              :src="participant.owner.avatar.md"
              square
          />
          <div class="tw-font-display">{{ participant.owner.name }}</div>
          <div class="tw-font-display">Joined : {{ $moment(participant.created_at).format('DD . MM .  YYYY') }}</div>

          <MessengerThreadSettingParticipantsPermissions :participant="participant"/>
          <div
              :class="{ 'tw-mb-[100rem]': admin  }"
              class="tw-flex tw-space-x-3"
          >
            <button
                v-ripple
                :class="
              admin
                ? '  tw-bg-skin-primary tw-text-white'
                : 'tw-bg-gray-100 dark:tw-bg-skin-background-400'
            "
                class="tw-px-6 tw-py-2 tw-flex-center tw-flex-col tw-rounded-lg"
                @click="admin = true"
            >
              Admin
            </button>
            <button
                v-ripple
                :class="
              !admin
                ? '  tw-bg-skin-primary tw-text-white'
                : 'tw-bg-gray-100 dark:tw-bg-skin-background-400'
            "
                class="tw-px-6 tw-py-2 tw-flex-center tw-flex-col tw-rounded-lg"
                @click="admin = false"
            >
              Member
            </button>
          </div>
          <div
              v-if="!admin"
              class="tw-mt-5 tw-space-y-4 tw-text-skin-base/70"
          >

            <div class="tw-my-5 tw-text-center tw-uppercase tw-tracking-widest tw-font-display tw-text-sm tw-font-bold">
              Permissions
            </div>

            <v-checkbox
                v-for="(option, index) in options"
                v-if="visible(index)"
                :key="$uuid()"
                v-model="options[index]"
                :checked="option"
                :label="getOptionName(index)"
                hide-details

            />

          </div>
        </div>
      </div>
      <div class="tw-flex tw-justify-between">
        <MessengerBaseBtn
            v-if="!isAdmin"
            :loading="removeLoding"
            bgColor="tw-bg-red-500"
            size="lg"
            @click="remove"
        > Remove
        </MessengerBaseBtn>
        <MessengerBaseBtn :loading="loading" class="  tw-hover-scale-sm tw-tracking-wider"
                          color="tw-bg-skin-primary"
                          size="lg" @click="submit"
        >Update
        </MessengerBaseBtn>


      </div>
    </div>

  </MessengerThreadSettingPage>
</template>
<script>

export default {

  data() {
    return {
      items: ["Admin", "Member"],
      participant: null,
      loading: false,
      removeLoding: false,
      isAdmin: false,
      admin: false,
      options: {
        add_participants: false,
        manage_invites: false,
        send_messages: false,
        send_knocks: false,
        start_calls: false,
        manage_bots: false
      }

    }

  },
  async fetch() {
    this.participant = await this.$api.messenger.participants.show(this.$route.params.participant)

    this.isAdmin = this.admin = this.participant.admin
    for (let item in this.participant) {
      if (this.options.hasOwnProperty(item)) this.options[item] = this.participant[item]
    }
  }, methods: {
    visible(index) {
      return {
        manage_bots: this.$store.state.messenger.config['bots'],
        manage_invites: this.$store.state.messenger.config['threadInvites'],
        start_calls: this.$store.state.messenger.config['calling'],
        send_knocks: this.$store.state.messenger.config['knockKnock']
      }[index] ?? true
    }, getOptionName(name) {
      return name.split(' ')
          .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
          .join(' ').replace('_', " ")
    },
    async remove() {
      this.removeLoding = true
      await this.$api.messenger.participants.delete(this.participant.id)

      this.removeLoding = false
      this.$store.commit('messenger/thread/participants/updateParticipant', this.participant)

      this.$messenger.to('threads.current.settings.participants')
      this.$store.commit('messenger/thread/participants/removeParticipant', this.participant.id)

      this.$toast.success('Participant was removed successfully !')

    },
    async submit() {
      this.loading = true
      this.participant = await this.update()
      this.loading = false
      this.$store.commit('messenger/thread/participants/updateParticipant', this.participant)
      this.$messenger.to('threads.current.settings.participants')
      this.$toast.success('Updated participant successfully !')
    }, update() {
      if (!this.admin)
        return this.$api.messenger.participants.update(this.participant.id, this.options)

      if (this.admin && this.isAdmin !== this.admin)
        return this.$api.messenger.participants.promote(this.participant.id)

      this.$api.messenger.participants.demote(this.participant.id)
      return this.$api.messenger.participants.update(this.participant.id, this.options)


    }
  }


}
</script>
