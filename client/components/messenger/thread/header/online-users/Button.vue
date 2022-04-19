<template>
    <span v-if="$messenger.activeThread().type ===2 ">
      <MessengerBaseIconButton icon="user-group"
                               name="Group Members" size="5" @click="visible=!visible"/>

    <v-slide-y-transition>
      <MessengerThreadHeaderOnlineUsersDialog v-if="visible "
                                              @closed="visible=false"/>
    </v-slide-y-transition>

    </span>
</template>
<script>
export default {

  data() {
    return {
      visible: false
    }
  }

}
</script>
