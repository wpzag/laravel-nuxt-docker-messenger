<template>
  <div class="tw-flex dark:tw-bg-skin-background-200">
    <div
        class=" smd:tw-hidden tw-relative tw-bg-cover tw-bg-[url('https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80')] tw-h-screen tw-w-2/4 tw-bg-gray-100 dark:tw-scrollbar-track-background-400">
      <div class="tw-absolute tw-inset-0 tw-bg-black/40 tw-flex-center">
        <div class="tw-text-white tw-tracking-widest tw-uppercase tw-font-bold ">Welcome To Wpzag
        </div>
      </div>
    </div>
    <div class="tw-w-2/4 smd:tw-w-full tw-flex-center   ">
      <div class="tw-w-full">
        <nuxt-child></nuxt-child>


      </div>
    </div>

  </div>


</template>
<script>
export default {
  layout: 'auth',
  auth: false,
  mounted() {
    this.deleteAllCookies()
  },
  methods: {
    deleteAllCookies() {
      let cookies = document.cookie.split(";")

      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i]
        let eqPos = cookie.indexOf("=")
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
      }
    }

  }

}
</script>

