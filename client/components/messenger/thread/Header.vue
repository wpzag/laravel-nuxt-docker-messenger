<template>
  <div
      v-if="thread"
      class="tw-flex tw-justify-between  tw-items-center tw-px-10 smd:tw-px-2 tw-py-4 tw-mx-auto tw-w-full tw-border-b  tw-border-skin-border"
  >


    <div class="tw-flex tw-items-center tw-space-x-5 smd:tw-space-x-0">
      <MessengerBaseIconButton class="tw-hidden smd:tw-block" icon="arrow-left-small"
                               size="5" @click="$messenger.to('threads')"
      ></MessengerBaseIconButton>
      <MessengerBaseAvatar

          :src="thread.avatar.sm"
          :status="thread.type === 1 ? $store.state.messenger.thread.participants.privateStatus.status:null"
          :size="$store.state.messenger.windowWidth > 400 ?5:4"
      />
      <div class=" tw-text-xl smd:tw-text-sm smd:tw-pl-4 tw-font-display tw-font-bold
      ">

        {{ thread.name }}
        <div v-if="thread.type===1" class="tw-text-xs tw-text-skin-secondary">

          {{ $store.state.messenger.thread.participants.privateStatus.text }}


        </div>
      </div>
    </div>
    <div class="tw-flex tw-space-x-8 tw-text-skin-secondary">
      <template v-if="thread.newThread ||thread.pending">
        <div class="tw-bg-orange-500 tw-text-white tw-px-2 tw-py-1 tw-rounded tw-text-sm">Pending</div>
      </template>
      <template v-else>
        <!--        <MessengerBaseIconButton icon="call" name="Call" size="5" @click="call"/>-->
        <MessengerThreadHeaderKnocksButton class="ssm:tw-hidden"/>
        <MessengerThreadHeaderOnlineUsersButton class="ssm:tw-hidden"/>


        <nuxt-link
            :to="$messenger.path('threads.current.settings')"
            class="tw-text-skin-secondary"
        >
          <MessengerBaseIconButton icon="vertical-dots" size="5"/>
        </nuxt-link>
      </template>

    </div>
  </div>
</template>
<script>

export default {

  computed: {
    thread() {
      return this.$messenger.activeThread()
    }
  }, methods: {
    call() {
      this.$store.dispatch('messenger/thread/call/start')

    }
  }

}

</script>
