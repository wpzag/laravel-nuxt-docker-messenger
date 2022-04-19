<template>
  <div
      class=" tw-flex tw-justify-between tw-items-center tw-border-b tw-border-skin-border tw-pb-8 tw-mb-2"
  >

    <div class="tw-font-bold tw-tracking-widest tw-uppercase ">
      Chats

    </div>
    <div class="tw-space-x-4 tw-flex"

    >

      <!--      <MessengerBaseIconButton icon="search" size="4"/>-->
      <div class="tw-relative ">
        <MessengerBaseIconButton
            :class="{'tw-transform tw-rotate-45 tw-bg-red-500':visible,'tw-bg-skin-primary':!visible}"

            class="tw-text-white tw-transition-defaults   tw-rounded-2xl tw-p-3  " icon="plus"
            size="4"
            @click="visible=!visible"
        />
        <v-slide-y-transition>
          <div v-if="visible" class="tw-absolute tw-top-[115%] tw-inset-x-0 tw-space-y-1 tw-z-10">
            <MessengerBaseIconButton
                class="tw-text-white tw-bg-skin-primary tw-rounded-2xl tw-p-3 "
                icon="chat"
                size="4"
                @click="create('private')"
            />

            <MessengerBaseIconButton
                class="tw-text-white tw-bg-skin-primary tw-rounded-2xl tw-p-3 "
                icon="user-group"
                size="4"
                @click="create('group')"/>
          </div>
        </v-slide-y-transition>

      </div>


    </div>
    <v-slide-y-transition>
      <LazyMessengerThreadsNewThreadGroup v-if="dialog==='group'" @close="dialog=false"/>
      <LazyMessengerThreadsNewThreadPrivate v-if="dialog==='private'"
                                            @close="dialog=false"/>


    </v-slide-y-transition>

  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      dialog: false
    }
  }, methods: {
    create(type) {
      this.dialog = type
      this.visible = false
    }
  }

}
</script>
