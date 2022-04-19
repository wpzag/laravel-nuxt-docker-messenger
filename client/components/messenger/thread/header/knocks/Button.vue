<template>
    <span>
      <MessengerBaseIconButton icon="knock"
                               name="Knock" size="5" @click="knock"/>

    <v-fade-transition>
      <MessengerThreadHeaderKnocksDialog v-if="visible"/>
    </v-fade-transition>

    </span>
</template>
<script>
export default {

  data() {
    return {
      countDown: 0
    }
  },
  computed: {
    visible() {
      return this.$store.getters['messenger/knocks/visible']
    }
  },

  methods: {
    async knock() {
      await this.$axios.$post(`/messenger/threads/${this.$messenger.activeThreadId()}/knock-knock`)
      this.$store.commit('messenger/knocks/showKnock')
      this.$messenger.sounds.knock.play()
      setTimeout(() => {
        this.$store.commit('messenger/knocks/reset')
      }, 2000)
    }

  }
}
</script>
