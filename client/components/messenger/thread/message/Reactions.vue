<template>

  <div
      v-if="message.reacted"
      :class="ownMessage?'tw-justify-end' :'tw-justify-start'"
      class="tw-flex tw-w-full my-1 tw-relative "
  >

    <v-scale-transition class="tw-flex tw-space-x-1" group>
      <div
          v-for="(emoji, i) in message.reactions.data"
          :key="i"
          class="tw-py-0.5 tw-cursor-pointer tw-px-2 tw-rounded tw-bg-gray-100 dark:tw-bg-skin-background-200 tw-text-skin-secondary  "
          @click="toggle(emoji, i)"
      >
           <span v-tippy :content="reactionOwners(emoji)">
                             <span>{{ emoji.length }}</span>

              <span>{{ convert(i) }}</span>
            </span>

      </div>
    </v-scale-transition>
  </div>

</template>
<script>

export default {
  props: ["message", "ownMessage"],

  methods: {
    reactionOwners(emoji) {
      return emoji.map(el => el.owner.name).join(' - ')
    },
    async toggle(emoji, name) {
      const ownEmoji = emoji.find(el => el.owner_id === this.$auth.user.id)

      let api = this.$api.messenger.messages

      if (ownEmoji) return await api.removeReact(this.message.thread_id, this.message.id, ownEmoji.id)
      await api.react(this.message.thread_id, this.message.id, name)

    },
    convert(emoji) {
      return this.$messenger.joypixels.shortnameToUnicode(emoji)
    }
  }
}
</script>
