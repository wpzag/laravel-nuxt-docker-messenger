<template>
  <MessengerThreadsNewThreadDialog name='Add Friends ' @close="$emit('close')">


    <div class="tw-mt-3">
      <v-text-field
          v-model="q"
          hide-details
          label="Search by name"
          solo
      />
    </div>

    <div class="tw-h-64 tw-overflow-y-auto tw-scrollbar-none">

      <div v-if="loading">
        <MessengerBaseLoader class="tw-text-skin-base tw-mt-14 tw-mx-auto"/>
      </div>
      <div v-if="!loading && list.length === 0"
           class="tw-flex-center tw-border tw-border-skin-border tw-text-skin-secondary tw-w-full tw-h-full">
        There are no users found !
      </div>

      <div v-for="user in list" v-else :key="user.id"

           class="tw-flex tw-py-3 tw-px-2 tw-justify-between tw-items-center hover:tw-bg-gray-100 hover:dark:tw-bg-skin-background-400 tw-transition-defaults"
      >
        <div class="tw-flex-center tw-space-x-3 ">
          <MessengerBaseAvatar :src="user.avatar.sm " size="2.5"/>
          <span class="tw-text-xs ">{{
              user.base.name
            }}</span>
        </div>

        <v-btn
            :color="[2,1].includes(user.options.friend_status) ?'gray': 'success'"
            :disabled="[2,1].includes(user.options.friend_status)"
            :loading="user.loading"
            elevation="0" small @click="submit(user)"> {{ status(user.options.friend_status) }}
        </v-btn>


      </div>
    </div>

  </MessengerThreadsNewThreadDialog>
</template>
<script>
import useMessengerPagination from "@/hooks/messenger/useMessengerPagination"
import {onMounted} from "@nuxtjs/composition-api"
import Vue from "vue"

export default {
  setup() {
    const {loaded, loading, list, fetch, q} = useMessengerPagination('/messenger/users')
    onMounted(async () => await fetch())
    return {loaded, loading, list, fetch, q}
  },

  methods: {
    status(status) {
      return {
        0: 'Add Friend +',
        2: 'Sent Request',
        1: 'Friend'
      }[status]

    },
    async submit(user) {

      const index = this.$_.findIndex(this.list, ["provider_id", user.provider_id])
      Vue.set(this.list[index], "loading", true)

      const data = await this.$api.messenger.friends.add({
        recipient_id: user.provider_id,
        recipient_alias: "user"
      })
      if (index !== -1) Vue.set(this.list[index].options, "friend_status", 2)
      this.$toast.success(`You have sent a friend request to ${user.base.name} !`)
      Vue.set(this.list[index], "loading", false)

    }
  }


}


</script>
