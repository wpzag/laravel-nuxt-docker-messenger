<template>
  <div
      v-if="$auth.user "
      class="tw-flex tw-flex-col smd:tw-flex-row   tw-justify-between tw-items-center tw-border-r tw-border-skin-border dark:tw-border-transparent smd:tw-py-5 tw-py-10"
  >
    <div
        class="tw-px-5 smd:tw-justify-around   tw-flex smd:tw-w-full smd:tw-flex-row smd:tw-space-y-0 smd:tw-space-x-5  tw-justify-center tw-items-center tw-flex-col tw-space-y-5"
    >
      <MessengerBaseAvatar
          :loading="$store.state.messenger.avatarDownloading"
          v-if="$auth.user.avatar"
          :src="$auth.user.avatar.sm"
          :status="$store.getters['messenger/status']"
          class="smd:tw-hidden"
          size="4.5"
      />

      <div
          class="smd:tw-hidden tw-w-4 tw-rounded-full tw-bg-skin-primary dark:tw-bg-skin-primary/60 tw-bg-opacity-30 tw-h-1 tw-my-6"
      />
      <nuxt-link
          v-for="{ name, icon, notification, link } in items"
          :key="name"
          :to="link"
      >
        <MessengerSideMenuItem
            :active="
            name === 'Chat'
              ? $route.path.includes('threads')
              : $route.path === link
          "
            v-bind="{ name, icon, notification, link }"

        />
      </nuxt-link>

      <MessengerBaseDarkThemeToggler/>
    </div>

    <MessengerSideMenuItem class="smd:tw-hidden" icon="logout" name="Logout" @click="logout">
      <MessengerBaseLoader v-if="loading
" class="tw-text-sm"/>
    </MessengerSideMenuItem>

  </div>
</template>
<script>
export default {


  data() {

    return {

      loading: false,
      items: [
        {
          name: "Chat",
          icon: "chat",
          active: true,
          notification: false,
          link: "/messenger/threads"
        },
        {
          name: "Friends",
          icon: "user-group",
          active: false,
          notification: false,
          link: "/messenger/friends"
        },
        {
          name: "Notifications",
          icon: "bell",
          active: false,
          notification: true,
          link: "/messenger/notifications"
        },
        {
          name: "Setting",
          icon: "setting",
          active: false,
          notification: false,
          link: "/messenger/settings"
        }
      ]
    }
  }, methods: {

    async logout() {
      if (this.loading) return
      this.loading = true
      await this.$auth.logout()
      this.loading = false
      this.$router.replace('/login')
      this.$store.dispatch('messenger/reset')
    }
  }
}
</script>
