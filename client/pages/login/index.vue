<template>
  <div class="tw-p-20 smd:tw-p-5">
    <div
        class=" tw-text-skin-secondary tw-uppercase tw-tracking-wide tw-mb-10 tw-flex-col tw-flex-center tw-space-y-4">
      <div> Login your account
      </div>
      <div class="s tw-bg-skin-primary tw-h-1 tw-w-10">
      </div>

    </div>

    <v-form v-if="form" :disabled="form.loading"
            @submit.prevent="login">


      <v-text-field v-model="form.email" :error-messages="form.errors.errors['email']" label="email" outlined
      />
      <v-text-field

          v-model="form.password"
          :error-messages="form.errors.errors['password']"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          outlined
          @click:append="showPassword = !showPassword"
      />

      <v-btn
          :loading="form.loading"
          block
          class="tw-mt-5 "
          color="primary"
          elevation="0"
          large
          type="submit">Log in
      </v-btn>
      <div class="tw-text-center tw-my-5"> - Or -</div>
      <div class="tw-flex-center tw-space-x-3 ssm:tw-flex-col ssm:tw-space-y-4 ssm:tw-space-x-0">
        <MessengerBaseSocialButton
            color="#4267B2" icon="mdi-facebook" provider="facebook" title="Facebook"/>
        <MessengerBaseSocialButton color="#DB4437" icon="mdi-google-plus" provider="google" title="Google"/>

        <MessengerBaseSocialButton
            color="#333" icon="mdi-github" provider="github" title="Github"/>

      </div>
      <div class="tw-flex-center tw-mt-5">
        <v-btn color="green"
               dark
               elevation="0" large @click="$router.push('/login/demo')">
          Try Demo Account
        </v-btn>

      </div>
      <div class="tw-mt-20 tw-text-skin-secondary  tw-text-sm">
        Don't have an account ?
        <nuxt-link class="tw-underline tw-text-skin-secondary" to="/register">Sign Up</nuxt-link>
      </div>

    </v-form>
  </div>
</template>
<script>

export default {

  auth: false,

  data: function () {
    return {
      showPassword: false,
      form: {
        loading: false,
        email: 'admin@example.net',
        password: "123",
        errors: {errors: {email: null, password: null}}
      }
    }
  },
  methods: {
    login() {

      this.form.loading = true
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

