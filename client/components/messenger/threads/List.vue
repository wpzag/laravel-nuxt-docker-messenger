<template>
  <div

      class="tw-border-r tw-border-skin-border dark:tw-border-transparent  smd:tw-w-screen tw-w-96   tw-px-8 tw-flex tw-flex-col  "
  >
    <MessengerThreadsHeader class="flex-shrink-0 tw-py-8"/>
    <div class="tw-overflow-y-auto tw-scrollbar-none scrollbar-track-transparent tw-scrollbar-thin tw-flex-1 tw-pb-8 "
         @scroll="onScroll"
    >
      <v-slide-x-transition>

        <div v-if="threads.length"
        >
          <nuxt-link
              v-for="thread in threads"
              :key="thread.id"
              :to="$messenger.path(`threads.${thread.id}`)"
              @click.native="$store.dispatch('messenger/activeThread/update', thread.id)"

          >
            <MessengerThreadsItem

                :thread="thread"

            />
          </nuxt-link>

        </div>
      </v-slide-x-transition>

      <div v-if="!loading && threads.length===0"
           class="tw-flex tw-items-center tw-justify-center tw-mt-14 tw-flex-col">
        <MessengerBaseIcon class="tw-text-skin-secondary/60" name="message" size="40"></MessengerBaseIcon>

        <div class="tw-font-display tw-mt-6 tw-text-skin-secondary">
          You have no threads !
        </div>
      </div>

      <div v-if="loading">

        <div
            v-for="n in 20"
            :key="$uuid()"
            class="tw-mt-4 tw-px-7 tw-flex tw-space-x-3 tw-py-5 tw-items-center tw-border-b tw-border-skin-border/50"

        >
          <div class="tw-shimmer tw-rounded-2xl tw-w-[3.5rem] tw-h-[3.5rem]"></div>
          <div class="tw-space-y-3 tw-flex-1">
            <div class="tw-shimmer tw-rounded tw-w-2/4 tw-h-4"></div>
            <div class="tw-shimmer tw-rounded tw-w-full tw-h-3"></div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>
<script>

import VueLottiePlayer from "vue-lottie-player"

export default {
  components: {
    VueLottiePlayer
  },

  created() {
    this.$store.dispatch('messenger/threads/fetch')
  },
  computed: {
    threads() {
      return this.$store.state.messenger.threads.list
    },
    loading() {
      return this.$store.state.messenger.threads.loading
    },
    loaded() {
      return this.$store.state.messenger.threads.loading
    }
  },
  methods: {

    onScroll({target: {scrollTop, clientHeight, scrollHeight}}) {
      if (scrollTop + clientHeight >= scrollHeight) {
        if (!this.$store.getters["threads/loaded"])
          this.$store.dispatch('messenger/threads/fetch')
      }
    }
  }
}
</script>
