<template>
  <div>
    <LazyMessengerDevFaker/>

    <v-slide-y-reverse-transition>
      <LazyMessengerDialogsLightBox v-if="$store.state.messenger.dialogs.lightbox.show"/>
    </v-slide-y-reverse-transition>
    <v-slide-y-reverse-transition>
      <LazyMessengerDialogsAddParticipant v-if="$store.state.messenger.dialogs.addParticipant.show"/>
    </v-slide-y-reverse-transition>

    <v-slide-y-reverse-transition>
      <LazyMessengerDialogsEditMessage v-if="$store.state.messenger.dialogs.editMessage.show"/>
    </v-slide-y-reverse-transition>
    <v-slide-y-reverse-transition>
      <LazyMessengerDialogsMessageEditsHistory v-if="$store.state.messenger.dialogs.messageEdits.show"/>
    </v-slide-y-reverse-transition>

    <v-slide-y-reverse-transition>
      <LazyMessengerDialogsIncomingCall v-if="incomingCall" :call="incomingCall"/>
    </v-slide-y-reverse-transition>

    <v-slide-y-reverse-transition>
      <LazyMessengerDialogsCalling v-if="calling && call" :call="call"/>
    </v-slide-y-reverse-transition>


    <v-slide-y-reverse-transition>
      <LazyMessengerDialogsCall v-if="initJitsi" :call="call"/>
    </v-slide-y-reverse-transition>

    <div v-if="connecting"
         class="tw-fixed-overlay-full tw-flex-center tw-flex-col tw-space-y-8"
    >
      <MessengerBaseLoader/>
      <div>Connecting</div>
    </div>

  </div>
</template>
<script>
import {mapState} from "vuex"

export default {
  computed: {
    ...mapState("messenger/thread/call", [
      "incomingCall", "calling", "connecting", "call", "initJitsi"

    ])

  }

}
</script>
