<template>
  <v-overlay
      :color="thread ? 'black' : 'transparent'"
      hide-overlay
  >

    <template v-if="thread && thread.id !== $messenger.activeThreadId()">
      <div v-if="thread && sender" class="tw-rounded-xl tw-overflow-hidden">
        <div class="tw-bg-gray-200 dark:tw-bg-skin-background-400 tw-p-4">


          <div>Knock Knock !</div>

        </div>


        <div class="tw-px-14 tw-pt-5 tw-pb-14 tw-bg-gray-100 dark:tw-bg-skin-background-200">
          <div><span class="waving-hand">👋</span></div>
          <div class="tw-flex-center tw-space-x-4">
            <MessengerBaseAvatar :src="thread.group ? thread.avatar.sm : sender.avatar.sm"
                                 square
            />


            <div>
              {{ thread.group ? thread.name : sender.name }}
            </div>
          </div>


          <div class="tw-mt-10 tw-flex tw-justify-between tw-space-x-3">
            <MessengerBaseBtn bgColor="tw-bg-red-500" class="tw-hover-scale-sm" @click="close">Cancel</MessengerBaseBtn>
            <MessengerBaseBtn class="tw-hover-scale-sm" @click="view">
              <div class="tw-flex-center tw-space-x-2">
                <MessengerBaseIcon name="chat" size="3"/>
                <div> View
                </div>
              </div>
            </MessengerBaseBtn
            >
          </div>
        </div>
      </div>
    </template>
    <span v-else class="waving-hand">👋</span>
  </v-overlay>
</template>

<script>


export default {
  computed: {
    thread() {
      return this.$store.getters['messenger/knocks/thread']
    },
    sender() {
      return this.$store.getters['messenger/knocks/sender']
    }
  }, mounted() {
    if (this.thread?.id === this.$messenger.activeThreadId())
      setTimeout(() => {
        this.$store.commit('messenger/knocks/reset')
      }, 2000)
  },
  methods: {
    view() {
      this.$messenger.to('threads.' + this.thread.id, true)
      this.$store.dispatch('messenger/activeThread/update', this.thread.id)
      this.close()
    },
    close() {
      this.$store.commit('messenger/knocks/reset')
    }
  }
}
</script>
<style lang="scss">
.waving-hand {
  font-size: 100px;
  animation-name: wave-animation; /* Refers to the name of your @keyframes element below */
  animation-duration: 2.5s; /* Change to speed up or slow down */
  animation-iteration-count: infinite; /* Never stop waving :) */
  transform-origin: 70% 70%; /* Pivot around the bottom-left palm */
  display: inline-block;
}

@keyframes wave-animation {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  /* The following five values can be played with to make the waving more or less extreme */
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  /* Reset for the last half to pause */
  100% {
    transform: rotate(0deg);
  }
}
</style>
