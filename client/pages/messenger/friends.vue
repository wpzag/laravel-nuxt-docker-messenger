<template>
  <MessengerBasePage title="Friends List">


    <div class=" tw-space-y-3">
      <div class="tw-flex tw-justify-end tw-space-x-3">


        <MessengerBaseBtn size="lg" @click="dialog='requests'">
          Friend Requests
        </MessengerBaseBtn>
        <MessengerFriendsRequests v-if="dialog==='requests'" @close="dialog=false" @submit="$fetch()"/>

        <MessengerBaseBtn size="lg" @click="dialog='add'">
          + Add friend
        </MessengerBaseBtn>
        <MessengerFriendsAdd v-if="dialog==='add'" @close="dialog=false"/>


      </div>
      <v-text-field hide-details label="Search by name" outlined></v-text-field>

    </div>
    <div>

      <v-slide-y-reverse-transition appear>
        <div v-if="!$fetchState.pending">
          <div v-if="friends.length" class="tw-grid tw-grid-cols-4 md:tw-grid-cols-2 ssm:tw-grid-cols-1 tw-gap-3">
            <MessengerFriendsItem v-for="friend in friends" :key="friend.party.provider_id" :friend="friend"
                                  @removed="removed"/>
          </div>
          <div v-else class="tw-text-skin-secondary tw-flex-center tw-text-xl tw-mt-20">
            You have no friends !
          </div>

        </div>
      </v-slide-y-reverse-transition>

      <div v-if="$fetchState.pending" class="tw-grid  tw-grid-cols-4 md:tw-grid-cols-2 ssm:tw-grid-cols-1 tw-gap-3">
        <div v-for="n in 12" class="tw-shimmer tw-rounded-xl ">
          <div class="tw-h-56"></div>
        </div>
      </div>
    </div>

  </MessengerBasePage>

</template>
<script>
export default {
  layout: "messenger",
  data() {
    return {
      dialog: false,
      friends: []
    }
  },
  async fetch() {
    this.friends = await this.$api.messenger.friends.index()


  }, methods: {

    removed(id) {
      this.friends = this.friends.filter(el => el.id !== id)
    }
  }
}
</script>
