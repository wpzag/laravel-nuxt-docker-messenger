<template>
  <div class="tw-flex-none tw-relative ">

    <v-slide-y-transition>

      <div v-if="$store.state.messenger.activeThread.distanceFromBottom >400"
           class="tw-absolute tw-right-10 tw--top-14 tw-rounded-full tw-text-white tw-bg-skin-primary tw-p-1">


        <MessengerBaseIconButton icon="arrow-down" size="5" @click="$messenger.scrollToBottom(true,true)"/>
      </div>
    </v-slide-y-transition>

    <div class="tw-flex tw-items-center tw-p-4 tw-space-x-4 ">
      <MessengerThreadFooterCodeUploader/>

      <MessengerThreadFooterTypingIndicator/>

      <MessengerThreadFooterAttachmentsButton class="tw-mr-2 tw-flex-shrink-0"/>

      <form
          class="tw-flex tw-flex-1 tw-items-center   "
          @submit.prevent="submit"
      >
        <div class="tw-relative tw-flex-1 ">
          <v-slide-y-transition>
            <LazyMessengerThreadFooterReplyPreview v-if="$store.state.messenger.thread.messages.reply_to"/>

          </v-slide-y-transition>
          <input
              id="messenger-footer-input"
              v-model="message "
              :readonly="audioRecorder"
              autocomplete="off"
              class="tw-rounded-full tw-py-2 tw-pl-3 tw-pr-10 tw-w-full tw-border tw-border-skin-border focus:tw-border-skin-border/80 dark:tw-caret-white tw-bg-gray-100 dark:tw-bg-skin-background-400 focus:tw-outline-none dark:tw-text-gray-200 tw-text-gray-700"
              placeholder="Type a message"
              type="text"
              @paste.prevent="handlePaste"
          />
          <MessengerThreadFooterEmojiPicker @selected="selectEmoji"/>


          <v-slide-y-transition>
            <MessengerThreadFooterVoiceRecorder v-if="audioRecorder"/>
          </v-slide-y-transition>
        </div>

        <MessengerThreadFooterButton
            :class="
          $store.state.messenger.thread.uploads.audioRecorder
            ? 'tw-text-red-500 hover:tw-text-red-500/80'
            : 'tw-text-skin-primary hover:tw-text-skin-primary-500/80'
        "
            :icon="icon"
            class="tw-flex-shrink-0 tw-ml-3"
            type="submit"

        />

      </form>
    </div>

  </div>
</template>
<script>
import {debounce} from "lodash"
import {requestMediaPermissions} from 'mic-check'

export default {
  data() {
    return {
      message: "",
      icon: "mic"
    }
  },
  computed: {
    audioRecorder() {
      return this.$store.state.messenger.thread.uploads.audioRecorder
    }, threadEcho() {
      return this.$store.state.messenger.thread.echo.threadEcho
    }, threadId() {
      return this.$store.state.messenger.activeThread.thread?.id
    }
  },
  methods: {
    handlePaste(event) {
      let items = (event.clipboardData || event.originalEvent?.clipboardData)
          .items
      let file = items[0].getAsFile()
      if (file) {
        this.$store.dispatch("messenger/thread/uploads/upload", file)

      } else {

        this.message = event.clipboardData.getData('Text')
      }


    }, selectEmoji(emoji) {
      this.message += emoji.data
    }, sendTypingEvent: debounce(function (typing) {
      this.threadEcho.whisper('typing', {
        provider_id: this.$auth.user.id,
        provider_alias: 'user',
        name: this.$auth.user.name,
        avatar: this.$auth.user.avatar.sm,
        typing
      })

    }, 200),
    async typing(typing) {
      if (this.$messenger.activeThread()?.newThread) return
      this.sendTypingEvent(typing)


    },
    async submit() {

      const {newThread, provider_id} = this.$messenger.activeThread()
      // if creating a new thread
      if (newThread) {
        this.$store.commit('messenger/activeThread/loading', true)
        this.$store.commit('messenger/activeThread/show', false)

        const data = await this.$api.messenger.thread.storePrivateThread({
          message: this.message,
          recipient_id: provider_id,
          recipient_alias: 'user'
        })
        // await this.$store.dispatch('messenger/threads/fetch')
        this.$messenger.to(`threads.${data.id}`)
        this.$store.dispatch('messenger/activeThread/update', data.id)
        return this.$store.commit('messenger/threads/add', data)

      }

      // if message is empty
      if (this.message === "") {
        return requestMediaPermissions({audio: true, video: false})
            .then(() => {
              this.$store.commit("messenger/thread/uploads/audioRecorder", !this.audioRecorder)
            })
            .catch((err) => {
              const {type, name, message} = err
              if (type === "SystemPermissionDenied") {
                this.$toast.error('Browser does not have permission to access microphone')
              } else if (type === "UserPermissionDenied") {
                this.$toast.error("You didn't allow your browser to access microphone, please try again after giving the permission to access microphone")

              } else if (type === "CouldNotStartVideoSource") {
                this.$toast.error(" Your mic is in use by another application")

              } else {
                this.$toast.error('Browser does not have permission to access microphone')
              }

            })
      }


      const id = this.$uuid()
      await this.typing(false)
      await this.$store.dispatch("messenger/thread/messages/store",
          {
            message: {
              id: id,
              temporary_id: id,
              type: 0,
              message: this.message,
              body: this.message,
              owner_id: this.$auth.user.id,
              owner: this.$auth.user,
              owner_type: `App\\Models\\User`,

              // reply_to_id: reply_to ? reply_to.id : null,
              loading: true
            }
          })

      this.message = ""
    }

  }
  ,
  watch: {
    audioRecorder(v) {
      this.icon = v ? "trash" : "mic"
    }, threadId() {
      this.message = ''
    },

    message(v) {
      this.icon = v !== "" ? "send" : "mic"
      v !== "" ? this.typing(true) : this.typing(false)

    }
  }
}
</script>
