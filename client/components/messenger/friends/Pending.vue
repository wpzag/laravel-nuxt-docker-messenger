<template>
  <MessengerThreadsNewThreadDialog name='Friend Requests' @close="$emit('close')">


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

      <div v-if="!$fetchState.pending && list.length === 0"
           class="tw-flex-center tw-border tw-border-skin-border tw-text-skin-secondary tw-w-full tw-h-full">
        You have no pending friends !
      </div>

      <div v-for="user in list" v-else :key="user.id"

           class="tw-flex tw-py-3 tw-px-2 tw-justify-between tw-items-center hover:tw-bg-gray-100 hover:dark:tw-bg-skin-background-400 tw-transition-defaults"
      >
        <div class="tw-flex-center tw-space-x-3 ">
          <MessengerBaseAvatar :src="user.sender.avatar.sm " size="2.5"/>
          <span class="tw-text-xs  ">{{
              user.sender.name
            }}</span>
        </div>

        <div>
          <MessengerBaseIconButton :loading="loading==='approve'" bgColor="tw-bg-green-500" icon="check" name="approve"
                                   size="3"
                                   textColor="tw-text-white"
                                   @click="submit(user,'approve')"/>
          <MessengerBaseIconButton :loading="loading==='deny'" bgColor="tw-bg-red-500" icon="close" name="deny"
                                   size="3"
                                   textColor="tw-text-white"
                                   @click="submit(user,'deny')"/>

        </div>


      </div>
    </div>

  </MessengerThreadsNewThreadDialog>
</template>
<script>

export default {
  data() {
    return {
      list: null,
      loading: false
    }
  },
  async fetch() {
    this.list = await this.$api.messenger.friends.pendingIndex()
  },
  methods: {
    async submit(user, type) {
      this.loading = type
      if (type === 'deny') {
        await this.$api.messenger.friends.deny(user.sender.options.pending_friend_id)
      } else {
        await this.$api.messenger.friends.approve(user.sender.options.pending_friend_id)
      }
      this.$emit('submit')
      this.list = this.list.filter(el => el.sender.id !== user.sender.id)
      const msg = {
        'approve': 'Friend request was approved successfully !',
        'deny': 'Friend request was deleted successfully !'
      }[type]
      this.$toast.success(msg)
      this.loading = false
    }
  }


}


</script>
