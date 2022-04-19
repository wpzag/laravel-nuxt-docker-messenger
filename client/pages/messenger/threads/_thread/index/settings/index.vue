<template>
  <div>

    <v-expand-transition>
      <div v-if="!expanded  ">
        <div
            class="tw-space-y-6 tw-border-b tw-border-dashed tw-border-skin-border tw-py-10"
        >
          <template v-if="$messenger.activeThread().type === 2 && visibleMenuItems.length">
            <nuxt-link
                v-for="item in visibleMenuItems"
                :key="item.name"
                :to="$route.fullPath + item.link" class="tw-block">

              <MessengerThreadSettingMainListItem
                  v-bind="item"
              />
            </nuxt-link>
          </template>

          <MessengerThreadSettingMainLeaveButton/>


        </div>

      </div>

    </v-expand-transition>

    <MessengerThreadSettingMainFilesSection/>

  </div>
</template>
<script>
import {mapState} from "vuex"

export default {
  data() {
    return {
      active: false,
      show: true


    }
  },
  computed: {

    items() {
      return [
        {
          name: " Invitations",
          icon: "link",
          textColor: "tw-text-blue-500",

          bgColor: "tw-bg-blue-500/10",
          desc: "Manage invitation links",
          link: "/invitations",
          visible: this.permissions.invitations


        },
        {
          name: " Memebers",
          icon: "user-group",
          textColor: "tw-text-green-500",
          bgColor: "tw-bg-green-500/10",
          desc: "Manage group members",
          link: "/participants",
          visible: this.permissions.admin

        },
        {
          name: " Settings",
          icon: "adjustments",
          textColor: "tw-text-cyan-500",
          bgColor: "tw-bg-cyan-500/10",
          desc: "Group settings",
          link: "/thread-settings",
          visible: this.permissions.admin

        },
        {
          name: " Bots",
          icon: "bot",
          textColor: "tw-text-indigo-500",
          bgColor: "tw-bg-indigo-500/10",
          desc: "Manage bots",
          link: "/bots",
          visible: this.permissions.manage_bots

        }
      ]
    },
    visibleMenuItems() {
      return this.items.filter(el => el.visible)
    },
    ...mapState("messenger/activeThread", [
      "permissions"
    ]),
    visible() {
      return this.$store.state.messenger.thread.settings.visible
    },
    expanded() {
      return this.$store.state.messenger.thread.filesWidget.expanded
    }
  }
}
</script>
