<template>
  <div
      class="tw-p-1  tw-absolute tw--top-5 tw-left-5"

  >
    <v-slide-y-transition>
      <div v-if="typingParticipants.length" class="tw-flex tw-text-skin-secondary tw-text-xs">
        <div
            v-for="(user,index) in typingParticipants.slice(0, 3)"
            :key="`typer_${user.value.provider_id}`"
            class="tw-mr-2"
        >
          {{ user.value.name }}
          <span v-if="typingParticipants.slice(0, 3).length -1 !== index">,</span>
          <!--          <MessengerBaseAvatar :size="1" :src="user.value.avatar"/>-->
        </div>
        <div v-if="typingParticipants.length > 3" class="tw-text-skin-secondary tw-text-xs tw-mr-2"> +
          {{ typingParticipants.length - 3 }}
        </div>
        <span class="ticontainer">
        <div class="tiblock">
          <div class="tidot"></div>
          <div class="tidot"></div>
          <div class="tidot"></div>
        </div>
      </span>
      </div>


    </v-slide-y-transition>
  </div>
</template>
<script>
export default {
  computed: {
    typingParticipants() {
      return this.$store.state.messenger.thread.participants.typingList
    }
  }
}
</script>
<style>
.tiblock {
  align-items: center;
  display: flex;
  height: 17px;
}

.ticontainer .tidot {
  background-color: #90949c;
}

.tidot {
  -webkit-animation: mercuryTypingAnimation 1.5s infinite ease-in-out;
  border-radius: 2px;
  display: inline-block;
  height: 4px;
  margin-right: 2px;
  width: 4px;
}

@-webkit-keyframes mercuryTypingAnimation {
  0% {
    -webkit-transform: translateY(0px);
  }
  28% {
    -webkit-transform: translateY(-5px);
  }
  44% {
    -webkit-transform: translateY(0px);
  }
}

.tidot:nth-child(1) {
  -webkit-animation-delay: 200ms;
}

.tidot:nth-child(2) {
  -webkit-animation-delay: 300ms;
}

.tidot:nth-child(3) {
  -webkit-animation-delay: 400ms;
}
</style>
