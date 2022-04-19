<template>
  <a @click.prevent="toggle">

    <MessengerSideMenuItem name="Toggle DarkTheme">

      <MessengerBaseIcon :name="dark?'moon':'brightness'" size="6" @click="toggle"/>
    </MessengerSideMenuItem>
  </a>
</template>

<script>
import hotkeys from "hotkeys-js"
import Messenger from "@/pages/messenger/friends"

export default {
  components: {Messenger},
  data() {
    return {
      dark: false
    }
  },
  created() {
    hotkeys("f5", (event) => {
      event.preventDefault()
      this.toggle()
    })
    this.dark = this.$store.state.messenger.settings.dark_mode
    this.$store.commit('messenger/darkMode', this.dark)

    this.setDark(this.dark)

  },

  methods: {
    setDark(makeDark) {
      if (makeDark) {

        document.querySelector("html").classList.add("tw-dark")
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
        document.querySelector("html").classList.remove("tw-dark")

      }
    },
    toggle() {
      this.dark = !this.dark

      this.setDark(this.dark)

      this.$store.commit('messenger/darkMode', this.dark)
      let options = this.$store.state.messenger.settings
      options.dark_mode = this.dark
      this.$api.messenger.base.updateSettings(options)


    }
  }
}
</script>
