<template>
  <MessengerThreadsNewThreadDialog name='Start A Chat ' @close="$emit('close')">


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
      <div v-for="user in list" v-else :key="user.provider_id"
           class="tw-flex tw-py-3 tw-px-2 tw-justify-between tw-items-center hover:tw-bg-gray-100 hover:dark:tw-bg-skin-background-400 tw-transition-defaults"
      >
        <div class="tw-flex-center tw-space-x-3 ">
          <MessengerBaseAvatar :src="user.avatar.sm " size="2.5"/>
          <span class="tw-text-xs ">{{
              user.base.name
            }}</span>
        </div>

        <v-btn
            :loading="user.loading"
            color="primary"
            elevation="0"
            small @click="submit(user)">Start chat
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
    async submit(user) {
      const index = this.$_.findIndex(this.list, ["provider_id", user.provider_id])
      if (index !== -1) Vue.set(this.list[index], "loading", true)

      await this.$store.dispatch('messenger/activeThread/create', user.provider_id)


      this.$messenger.to("threads.user=" + user.provider_id, false)
      this.$emit('close')
    }
  }


}


</script>
