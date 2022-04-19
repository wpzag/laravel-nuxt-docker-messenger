<template>
  <MessengerThreadsNewThreadDialog name='Create a group '>

    <div class="tw-border-b tw-border-dashed tw-border-skin-border  tw-flex tw-space-x-5">
      <!--          <MessengerBaseAvatarUploader src="/messenger/images/group.png"/>-->
      <v-text-field v-model="form.subject" :error-messages="form.errors.errors['subject']"
                    label="Name your group"/>
    </div>
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
            elevation="0" small @click="selectedFriends.includes(user.party_id)?remove(user) :selected(user)">{{
            selectedFriends.includes(user.party_id) ? '&check; Added' : '+ Add'
          }}
        </v-btn>


      </div>
    </div>
    <div class=" tw-flex tw-flex-row-reverse tw-flex tw-items-center">
        <span>

                    <v-btn color="grey" elevation="0" text @click="$emit('close')">Cancel</v-btn>

          <v-btn :loading="form.busy" color="primary" elevation="0" @click="submit">Create</v-btn>

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
      selectedFriends: []
    }
  },
  async fetch() {
    this.friends = await this.$api.messenger.friends.index()

  },
  methods: {
    selected(user) {
      this.selectedFriends.push(user.party_id)
    }, remove(user) {
      this.selectedFriends = this.selectedFriends.filter(el => el !== user.party_id)
    }, async submit() {
      this.form.providers = this.selectedFriends.map(id => ({
        alias: 'user',
        id
      }))

      const {data} = await this.form.post('/messenger/groups')
      this.$store.commit('messenger/threads/add', data)
      this.$emit('close')
    }
  }


}


</script>
