<template>
  <div id="meet"></div>
</template>
<script>

export default {

  data: () => ({
    api: null,
    loading: false
  }),
  mounted() {
    this.build()
  },

  methods: {
    async jitsiInit({room_id, room_pin}) {
      const data = await this.$axios.$get('/get_room_token?room=' + room_id)
      const domain = 'wpzag.com:8443'
      const options = {
        roomName: room_id,
        jwt: data,
        width: '100%',
        height: '100%',
        onload: () => this.$store.commit('messenger/thread/call/connecting', false),
        configOverwrite: {
          // startWithAudioMuted: true ,
          startWithVideoMuted: true
        }
      }

      const api = (this.api = new JitsiMeetExternalAPI(domain, options))
      api.executeCommand(
          'avatarUrl',
          this.$auth.user.avatar.md
      )
      api.executeCommand('displayName', this.$auth.user.name)
      // api.addEventListener('videoConferenceLeft', (ev) => {
      //   document.getElementById('jitsiConferenceFrame0').remove()
      // })

      api.addEventListener('videoConferenceLeft', (ev) => {
        const {call} = this.$store.state.messenger.thread.call
        this.$store.dispatch('messenger/thread/call/leave', {
          thread_id: call.thread_id, call_id: call.id
        })
        document.getElementById('jitsiConferenceFrame').remove()
      })
      api.on('passwordRequired', () => {
        api.executeCommand('password', room_pin)
      })
    },

    build() {
      this.$store.commit('messenger/thread/call/connecting', true)
      this.$loadScript('https://code.jquery.com/jquery-3.5.1.min.js').then(
          () => {
            this.$loadScript('https://wpzag.com:8443/external_api.js').then(
                () => {
                  this.jitsiInit(this.options)
                }
            )
          }
      )
    }
  },
  computed: {
    options() {
      return this.$store.state.messenger.thread.call.call?.options
    }
  }
}
</script>

<style>

.hide-call {
  left: 100000px !important;
}

#jitsiConferenceFrame0 {
  height: 100%;
  position: fixed;
  width: 100%;
  top: 0;
  border: 0px;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 324234234;
}
</style>
