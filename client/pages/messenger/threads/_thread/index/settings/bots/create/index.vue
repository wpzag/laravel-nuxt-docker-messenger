<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings.bots')" name="Choose an option">
    <div class="tw-text-skin-secondary">
      Would you like to create your own bot or install a ready-made bot package?

    </div>
    <div class="tw-flex-center tw-mt-5 tw-space-x-3">
      <nuxt-link :to="$messenger.path('threads.current.settings.bots.create.new')">
        <MessengerBaseBtn size="lg">Create</MessengerBaseBtn>
      </nuxt-link>
      <nuxt-link :to="$messenger.path('threads.current.settings.bots.create.install')">
        <MessengerBaseBtn size="lg">Install Packages</MessengerBaseBtn>
      </nuxt-link>

    </div>
  </MessengerThreadSettingPage>
</template>
