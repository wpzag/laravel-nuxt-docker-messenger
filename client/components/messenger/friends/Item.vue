<template>
  <div
      class="   tw-bg-gray-100  dark:tw-bg-skin-background-200   tw-rounded-xl tw-flex-col tw-flex-center tw-space-y-3  tw-p-10">
    <!-- TODO -->
    <button @click="$store.commit('messenger/dialogs/openLightBox',{src:friend.party.avatar.lg,type:'image'})">
      <MessengerBaseAvatar :src="friend.party.avatar.sm " :status="[3,1,2][Math.floor(Math.random() * 3)]" size="3.5"
                           square

      />
    </button>

    <div class="tw-text-xs tw-text-center  ">

      <span class="tw-font-bold">
            {{
          friend.party.name
        }}
          </span>
      <div class="tw-text-skin-secondary">
        <!-- TODO -->

        {{ ["last seen, 10 hours ago", "away", "online"][Math.floor(Math.random() * 3)] }}
      </div>

    </div>
    <div>
      <MessengerBaseIconButton :loading="messageLoading" bgColor="tw-bg-skin-primary" icon="chat"
                               name="Start chat"
                               size="3"
                               textColor="tw-text-white" @click="message"/>
      <MessengerBaseIconButton :loading="removeLoading" bgColor="tw-bg-red-500" icon="trash" name="Delete"
                               size="3" textColor="tw-text-white"
                               @click="remove"/>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      messageLoading: false,
      removeLoading: false
    }
  },

  props: ['friend'], methods: {
    async message() {
      this.messageLoading = true
      await this.$store.dispatch('messenger/activeThread/create', this.friend.party.provider_id)
      this.messageLoading = false

    }, async remove() {

      this.removeLoading = true
      await this.$messenger.confirmAlert(`Are you sure you want to remove ${this.friend.party.name} from your friends list`,
          () => this.removeLoading = true,
          () => this.$api.messenger.friends.destroy(this.friend.id),
          () => {
            this.removeLoading = false
            this.$emit('removed', this.friend.id)
          },
          () => this.removeLoading = false
      )


    }
  }
}
</script>
