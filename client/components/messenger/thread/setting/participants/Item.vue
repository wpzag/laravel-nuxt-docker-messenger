<template>
  <nuxt-link
      :to="{
      name: 'messenger-threads-thread-index-settings-participants-participant',
      params: { participant: participant.id },
    }"
      class="tw-flex tw-space-x-3 tw-items-center tw-hover-scale-sm tw-cursor-pointer tw-bg-gray-100/50 dark:tw-bg-skin-background-200 tw-py-5 tw-rounded-xl tw-group"
  >
    <div class="tw-flex-shrink-0">
      <MessengerBaseAvatar :src="participant.owner.avatar.sm" size="4" square/>
    </div>
    <div class="tw-flex-1 tw-flex tw-flex-col tw-justify-between">
      <div class="tw-font-display tw-text-skin-base">{{ participant.owner.name }}</div>
      <div class="tw-text-skin-secondary tw-text-xs tw-transition-defaults">
        <div v-if="participant.admin" class="tw-text-yellow-600">
          <MessengerBaseIcon name="crown" size="5"/>
          Admin
        </div>
        <MessengerThreadSettingParticipantsPermissions
            v-else
            :participant="participant"
        />
      </div>
    </div>
    <MessengerBaseIcon
        class="tw-h-4 tw-w-4 tw-text-skin-secondary/50 tw-opacity-0 group-hover:tw-opacity-100 tw-transform tw-translate-x-7 group-hover:tw-translate-x-0 tw-transition-defaults group-hover:tw-text-skin-primary"
        name="arrow-right"
    >
    </MessengerBaseIcon>
  </nuxt-link>
</template>

<script>
export default {
  props: ["participant"]
}
</script>
