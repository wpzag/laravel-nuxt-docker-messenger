<template>
  <div class="tw-border tw-border-dashed tw-border-skin-border tw-p-4">
    <div class="tw-flex tw-justify-between tw-items-center tw-text-xs mb-4 ">

      <MessengerBaseIconButton
          :loading="loading"
          bgColor="tw-bg-skin-background-200"
          class=" hover:tw-text-red-500"
          icon="trash"
          name="Delete"
          size="5"
          @click="remove"
      />
      <div class="tw-relative tw-flex tw-flex-col tw-items-center">
        <div>{{ item.owner.name }}</div>
        <div class="tw-mt-3 -tw-bottom-0 tw-h-1 tw-w-8 tw-bg-skin-border "></div>
      </div>
      <MessengerBaseIconButton
          icon="info"
          name="info"
          size="5"
          @click="expand"
      />


    </div>


    <div class="tw-px-4 tw-pt-4">

      <v-text-field
          :id="item.id + '_link'"
          :value="item.route"
          class="tw-text-skin-secondary mb-4 "

          hide-details
          label="Invitation Link"
          outlined
          readonly
      >
        

        <template v-slot:append>
          <button class="tw-relative" @click="copyHandler">
            <MessengerBaseIcon
                v-tippy
                class="tw-text-skin-secondary hover:tw-text-skin-base tw-transition-defaults tw-cursor-pointer z-10"
                content="copy"
                name="copy"
                size="5"
            />
            <v-slide-y-transition>
              <div
                  v-if="coppied"
                  class="tw-px-3 py-2 tw-text-xs tw-rounded-xl tw-bg-green-500/90 tw-transition-defaults tw-cursor-pointer tw-hover-scale-sm tw-text-white tw-absolute tw--top-10 tw-inset-x-center"
                  content="Copy Code"
              >
                Coppied!
              </div>
            </v-slide-y-transition>
          </button>
        </template>
      </v-text-field>

      <v-expand-transition>
        <div
            v-if="expanded"
            class="tw-grid tw-grid-cols-2 tw-gap-x-0 tw-gap-y-4 tw-text-skin-secondary tw-text-xs tw-px-2"
        >
          <div>Max : {{ item.max_use }} uses</div>
          <div class="tw-text-right">Remaining : {{ item.uses }} left</div>
          <div>Expire: in a day</div>

        </div>
      </v-expand-transition>
    </div>

  </div>

</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      expanded: false,
      coppied: false,
      loading: false
    }
  },

  methods: {
    async remove() {
      this.loading = true
      await this.$api.messenger.invitations.destroy(this.item.id)
      this.loading = false

      this.$emit('removed', this.item.id)

      this.$toast.success('The invitation link has been removed successfully!')
    },
    expand() {
      this.expanded = !this.expanded
    },
    copyHandler() {
      this.coppied = true
      const el = document.getElementById(this.item.id + "_link")

      el.select()
      // copyText.setSelectionRange(0, 99999) /* For mobile devices */

      document.execCommand("copy")

      setTimeout(() => (this.coppied = false), 1000)
    }
  }
}
</script>
<style scoped>
>>> .v-input input {
  @apply tw-text-skin-secondary
}
</style>
