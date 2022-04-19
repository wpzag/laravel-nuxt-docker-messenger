<template>
  <MessengerThreadsNewThreadDialog name='Add members '>


    <div class="tw-mt-3">
      <v-text-field
          hide-details
          label="Search by name"
          solo

      />
    </div>

    <div class="tw-h-64 tw-overflow-y-auto tw-scrollbar-none">

      <div v-if="$fetchState.pending">
        <MessengerBaseLoader class="tw-text-skin-base tw-mt-14 tw-mx-auto"/>

      </div>
      <div v-for="user in friends" v-else :key="user.id"
           :class="{'tw-bg-gray-100  dark:tw-bg-skin-background-400' :selectedFriends.includes(user.party_id)}"
           class="tw-flex tw-py-3 tw-px-2 tw-justify-between tw-items-center hover:tw-bg-gray-100 hover:dark:tw-bg-skin-background-400 tw-transition-defaults"
      >
        <div class="tw-flex-center tw-space-x-3 ">
          <MessengerBaseAvatar :src="user.party.avatar.sm " size="2.5"/>
          <span :class="{'tw-font-bold':selectedFriends.includes(user.party_id)}" class="tw-text-xs ">{{
              user.party.name
            }}</span>
        </div>

        <v-btn
            :color="selectedFriends.includes(user.party_id)?'gray': 'success'"
            :disabled="participants.includes(user.party_id)"
            elevation="0" small @click="selectedFriends.includes(user.party_id)?remove(user) :selected(user)">{{
            participants.includes(user.party_id) ? '&check; In group' : (selectedFriends.includes(user.party_id) ? 'Selected' : '+ Add')
          }}
        </v-btn>


      </div>
    </div>
    <div class=" tw-flex tw-flex-row-reverse tw-flex tw-items-center">
        <span>
           <v-btn color="grey" elevation="0" text @click="close">Cancel</v-btn>

          <v-btn :loading="form.busy" color="primary" elevation="0" @click="submit">Submit</v-btn>

        </span>

    </div>
  </MessengerThreadsNewThreadDialog>
</template>
<script>
export default {
  data() {
    return {
      form: this.$vform({
        providers: [],
        subject: ''
      }),
      friends: [],
      selectedFriends: [], participants: []
    }
  },
  async fetch() {
    this.friends = await this.$api.messenger.friends.index()
    this.participants = this.$store.state.messenger.thread.participants.list.map(el => el.owner.provider_id)

  },
  methods: {
    selected(user) {
      this.selectedFriends.push(user.party_id)
    },
    remove(user) {
      this.selectedFriends = this.selectedFriends.filter(el => el !== user.party_id)
    }, async submit() {

      this.form.providers = this.selectedFriends.map(id => ({
        alias: 'user',
        id
      }))

      await this.$api.messenger.participants.store(this.form)

      this.$toast.success('Participants added successfully !')

      this.close()

    }, close() {
      this.$store.commit('messenger/dialogs/addParticipant', false)

    }
  }


}


</script>
