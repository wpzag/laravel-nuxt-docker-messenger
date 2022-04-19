<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings')" :loading="$fetchState.pending"
                              name="Invitations">
    <MessengerThreadSettingPageHeader
        v-if="meta"
        :link="$messenger.path('threads.current.settings.invitations.create') "
        :title="`Invites : ${meta.total}/ ${meta.max_allowed}`"
        icon="plus"
    />

    <MessengerThreadSettingEmptyList
        v-if="invitations.length === 0"
        :link="$messenger.path('threads.current.settings.invitations.create') "
        content=" This chat doesn't have any invitation links"
        icon="link"
    />

    <div v-else class="tw-space-y-3 tw-rounded-2xl tw-text-skin-secondary">

      <MessengerThreadSettingInvitationsItem v-for="item in invitations" :key="item.id" :item="item"
                                             @removed="removed"/>

    </div>
  </MessengerThreadSettingPage>
</template>
<script>

export default {

  data() {
    return {
      invitations: [], meta: null
    }
  }, async fetch() {
    const {data, meta} = await this.$api.messenger.invitations.index()
    this.invitations = data
    this.meta = meta
  },
  methods: {
    removed(id) {
      this.invitations = this.invitations.filter((i) => i.id !== id)
    }
  }

}
</script>
