<template>
  <div

      v-click-outside="()=>$emit('closed')"
      class="
      tw-fixed
      tw-z-40
      tw-right-2
      tw-bottom-[4rem]
      tw-top-[7.5rem]
       tw-rounded-xl
         tw-bg-skin-background-200
          tw-flex
tw-px-6
tw-py-5
tw-scrollbar-none
tw-overflow-y-auto

          tw-flex-col
          tw-w-56 tw-space-y-5  ">

    <MessengerThreadHeaderOnlineUsersSection v-if="admins.length" :list="admins" :title="`Admin - ${admins.length}`"/>
    <MessengerThreadHeaderOnlineUsersSection v-if="members.length" :list="members"
                                             :title="`Members -  ${members.length}`"/>


  </div>

</template>

<script>


export default {
  computed: {
    admins() {
      return this.$store.state.messenger.thread.participants.list.filter(el => el?.admin)
    },
    members() {
      let list = this.$store.state.messenger.thread.participants.list.filter(el => !el?.admin)
      list = this.$_.sortBy(list, (e => e.priorty))
      return list
    }

  }
}
</script>
