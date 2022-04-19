<template>
  <div>

    <div v-if="!$fetchState.pending" class=" tw-h-[60rem] tw-overflow-y-auto">

      <div class="tw-flex tw-mx-5  ">
        <MessengerBaseIconButton class="" icon="arrow-left-small" size="6"
                                 @click="$router.push('/login')"></MessengerBaseIconButton>

        <div
            class="  tw-text-skin-primary tw-text-xl tw-flex-center  tw-font-bold">
          Select a user
        </div>


      </div>
      <div class="tw-grid tw-gap-4 tw-grid-cols-4 lg:tw-grid-cols-3 md:tw-grid-cols-2 ssm:tw-grid-cols-1 tw-p-5 ">
        <button v-for="(user,index) in list" :key="user.id"
                class="tw-border tw-border-skin-border tw-bg-gray-100 dark:tw-bg-skin-background-400 tw-cursor-pointer  tw-p-8 tw-hover-scale-md tw-rounded hover:tw-bg-gray-100 hover:dark:tw-bg-skin-background-400 tw-transition-defaults"

                @click="login(user,index)"
        >
          <div v-if="!user.loading" class="tw-flex-center tw-flex-col tw-space-y-4">

            <MessengerBaseAvatar :src="user.avatar.sm " size="5"/>
            <div class="tw-text-xs ">{{
                user.base.name
              }}
            </div>

          </div>
          <div v-else class="tw-flex-center">
            <MessengerBaseLoader/>
          </div>
        </button>


      </div>

    </div>
    <div v-else class="tw-flex-center">
      <MessengerBaseLoader/>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'

export default {

  data() {
    return {
      list: [],
      form: {
        loading: false,
        email: 'admin@example.net',
        password: "123",
        errors: {errors: {email: null, password: null}}
      }

    }
  },

  async fetch() {
    this.list = await this.$axios.$get('/messenger/demo_users')
  }, methods: {
    login(user, index) {
      if (this.form.loading) return
      Vue.set(this.list[index], 'loading', true)

      this.form.loading = true
      this.form.email = user.base.email
      this.form.password = "123"
      this.$auth.loginWith('laravelSanctum', {
        data: this.form
      })
          .then(async () => {
            await this.$store.dispatch('messenger/reset')
            await this.$router.push('/messenger/threads')
          })
          .catch(e => {
            this.form.errors.errors = e.response?.data?.errors || {email: '', password: ''}
            this.form.loading = false
          }).then(() => this.form.loading = false
      )

    }
  }
}
</script>
