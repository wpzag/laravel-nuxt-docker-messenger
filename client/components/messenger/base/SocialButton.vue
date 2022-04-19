<template>
  <v-btn :color="color"
         :loading="loading" dark elevation="0" large @click="login">
    <v-icon left>{{ icon }}</v-icon>
    {{ title }}
  </v-btn>
</template>
<script>
export default {
  name: 'SocialButton',
  props: ['icon', 'title', 'color', 'provider'],
  data() {
    return {
      loading: false
    }
  },


  mounted() {
    window.addEventListener('message', this.onMessage, false)
  },

  beforeDestroy() {
    window.removeEventListener('message', this.onMessage)
  },
  methods: {
    async login() {
      this.loading = true
      const newWindow = openWindow('', 'login')

      await this.$axios.$get('/sanctum/csrf-cookie')

      newWindow.location.href = await this.$axios.$post(`/oauth/${this.provider}`)

    },

    /**
     * @param {MessageEvent} e
     */
    async onMessage(e) {


      if (e.origin !== window.origin || !e.data.token) {
        return
      }
      await this.$auth.setUserToken(e.data.token)

      this.$auth.fetchUser()
          .then(() => {
            this.$auth.fetchUser().then(() => {
              this.$router.push('/')
              this.loading = false

            }).catch((e) => {
              this.$auth.logout()
              this.$router.push(`/login`)
              this.loading = false

            })
          })

    }
  }

}

function openWindow(url, title, options = {}) {
  if (typeof url === 'object') {
    options = url
    url = ''
  }

  options = {url, title, width: 600, height: 720, ...options}

  const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screen.left
  const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screen.top
  const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      window.screen.width
  const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      window.screen.height

  options.left = width / 2 - options.width / 2 + dualScreenLeft
  options.top = height / 2 - options.height / 2 + dualScreenTop

  const optionsStr = Object.keys(options)
      .reduce((acc, key) => {
        acc.push(`${key}=${options[key]}`)
        return acc
      }, [])
      .join(',')

  const newWindow = window.open(url, title, optionsStr)

  if (window.focus) {
    newWindow.focus()
  }

  return newWindow
}


</script>
