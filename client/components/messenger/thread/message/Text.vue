<template>
  <div :class="{' own-message':ownMessage}" class="tw-px-4 tw-py-3 ">
    <span v-html="text(message)"></span>
    <span
        v-if="message.edited"
        class="tw-text-sm tw-opacity-30 tw-font-bold"
    >
          <span
              v-if="$store.state.messenger.config.messageEditsView"
              style="cursor: pointer"
              @click="
              $store.commit('messenger/dialogs/messageEdits', {show:true,message})
            "
          >
            (edited)
          </span>
          <span v-else> (edited) </span>
        </span>

  </div>
</template>
<script>

export default {
  props: ["message", "ownMessage"],
  methods: {
    text(message) {
      return this.$messenger.message.parse(message)

    }
  }
}
</script>
<style>
.ms-message a {
  text-decoration: underline !important;
}

.ms-message .own-message a {
  color: white !important;
  text-decoration: underline !important;
}
</style>
