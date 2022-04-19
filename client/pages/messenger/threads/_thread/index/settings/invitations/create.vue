<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings.invitations')" class="space-y-3"
                              name="Create Invitation Link">
    <div
        class="text-sm tw-text-skin-secondary p-4 bg-gray-100 dark:bg-skin-background-200 rounded my-4 tw-border-skin-border tw-border-b tw-pb-4"
    >
      Create a group invitation link that will allow those you share it with to
      join this group, given it meets the criteria you choose below
    </div>

    <div class="text-skin-secondary text-sm mb-4 tw-text-sm">Expires After :</div>

    <v-select v-model="selectedDuration"
              :items="durations"
              item-text="text"
              item-value="value"
              label="Duration"
              outlined
    />

    <v-select v-model="selectedUses"
              :items="uses" item-text="text" item-value="value"
              label="Uses"
              outlined
    />

    <MessengerBaseBtn
        :loading="loading"
        class="tw-bg-skin-primary tw-hover-scale-sm float-right tracking-wider"
        size="lg"
        @click="create"
    >Create
    </MessengerBaseBtn>
  </MessengerThreadSettingPage>
</template>
<script>

export default {

  data() {
    return {
      loading: false,
      durations: [
        {value: 1, text: "30 minutes"},
        {value: 2, text: "1 hour"},
        {value: 3, text: "6 hours"},
        {value: 4, text: "12 hours"},
        {value: 5, text: "1 day"},
        {value: 6, text: "1 week"},
        {value: 7, text: "2 weeks"},
        {value: 8, text: "1 month"},
        {value: 0, text: "Never"}
      ],
      uses: [
        {
          value: 0,
          text: "No limit"
        },
        {value: 1, text: "1 use"},
        {value: 5, text: "5 uses"},
        {value: 10, text: "10 uses"},
        {value: 25, text: "25 uses"},
        {value: 50, text: "50 uses"},
        {value: 100, text: "100 uses"}
      ],
      selectedDuration: 5,

      selectedUses: 5
    }
  }, computed: {
    expirationDate() {
      if (this.expires === 1) return this.getExpirationDate(30, 'minutes')
      if (this.expires === 2) return this.getExpirationDate(1, 'hours')
      if (this.expires === 3) return this.getExpirationDate(6, 'hours')
      if (this.expires === 4) return this.getExpirationDate(12, 'hours')
      if (this.expires === 5) return this.getExpirationDate(1, 'days')
      if (this.expires === 6) return this.getExpirationDate(1, 'weeks')
      if (this.expires === 7) return this.getExpirationDate(2, 'weeks')
      if (this.expires === 8) return this.getExpirationDate(1, 'months')
    }
  }, methods: {
    getExpirationDate(amount, type) {
      return this.$moment.utc().add(amount, type).format('YYYY-MM-DD HH:mm:ss')
    },
    async create() {
      this.loading = true
      await this.$api.messenger.invitations.store({
        expires: this.expirationDate,
        uses: this.selectedUses
      })
      this.loading = false
      this.$messenger.to('threads.current.settings.invitations')
      this.$toast.success('You have created a new invitation link successfully!')
    }
  }
}
</script>
