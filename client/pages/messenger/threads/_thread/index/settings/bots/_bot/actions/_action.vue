<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings.bots.current')"
                              :loading="$fetchState.pending"
                              name="Edit Action">

    <v-select v-model="form.handler"
              :error-messages="form.errors.errors['handler']"
              :items="actions"
              class="tw-mt-5"
              item-text="text"
              item-value="value"
              label="Select an Action"
              outlined
              @change="handlerSelected"


    />
    <v-text-field
        v-model="form.cooldown"
        :error-messages="form.errors.errors['cooldown']"
        label="Cooldown (in seconds)"
        outlined
        type="number"

    />

    <v-text-field
        v-model="form.triggers"

        :error-messages="form.errors.errors['triggers']"
        chips
        hint="Separate multiple triggers using commas ( , ) "
        label="Triggers"
        multiple
        outlined
        persistent-hint
        placeholder="!hello,!hey,!hi"

    >
    </v-text-field>
    <v-select v-model="form.match"
              :error-messages="form.errors.errors['match']"

              :hint="hint"
              :items="[
          'contains',
          'contains:caseless',
          'contains:any',
          'contains:any:caseless',
          'exact',
          'exact:caseless',
          'starts:with',
          'starts:with:caseless'
        ]"
              class="mt-5"

              label="Match Method"
              outlined
              persistent-hint

    />

    <div class="mt-3">
      <v-switch
          v-model="form.enabled"

          :color="form.enabled ? 'success' : 'error'"
          :error-messages="form.errors.errors['enabled']"
          class="ml-3 d-inline-block"
          inset
          label="Enabled"
      />
    </div>
    <div>
      <v-select
          v-if="languages.length"
          v-model="form.lang"
          :error-messages="form.errors.errors['lang']"
          :items="languages"
          class="mt-4 mb-4"
          item-text="text"
          item-value="value"
          label="Select Language"
          outlined

      />

      <div v-if="react">
        <div class="mb-4">
          Selected Emoji :
          <h1 class="d-inline">{{ this.form.reaction }}</h1>
        </div>
        <VEmojiPicker :dark="$store.getters['messenger/isDark']"
                      @select="emojiSelected"/>


      </div>
      <div v-if="reply">
        <v-switch
            v-model="form.quote_original"

            :color="form.quote_original ? 'success' : 'error'"
            :error-messages="form.errors.errors['quote_original']"
            class="ml-3 d-inline-block"
            inset
            label="Quote matching message?"
        />
        <p class="caption">
          When enabled, the first reply will use the matching message within the
          reply.
        </p>
        <div class="mt-4">
          <div class="mb-3">Replies [One required. Max of 5] :</div>
          <div v-if=" form.errors.errors['replies']" class="tw-text-red-500">{{ form.errors.errors['replies'] }}</div>
          <v-text-field
              v-for="reply in replies"
              :key="$uuid()"
              v-model="reply.value"
              :label="reply.text"
              outlined
          />
        </div>
      </div>
    </div>
    <div>
      <v-switch
          v-model="form.admin_only"
          :color="form.admin_only ? 'success' : 'error'"

          :error-messages="form.errors.errors['admin_only']"
          class="ml-3 d-inline-block"
          inset
          label="Admin Only"
      ></v-switch>
      <div class="tw-flex tw-justify-between tw-flex-row-reverse tw-my-5">

        <MessengerBaseBtn :loading="form.busy" size="lg" @click="update">Update</MessengerBaseBtn>

        <MessengerBaseBtn :loading="deleteLoading" bgColor="tw-bg-red-500" size="lg"
                          @click="destroy">Delete
        </MessengerBaseBtn>
      </div>

    </div>

  </MessengerThreadSettingPage>
</template>
<script>
import {VEmojiPicker} from 'v-emoji-picker'

export default {
  components: {
    VEmojiPicker
  },
  data() {
    return {
      actions: [],
      reply: false,
      react: false,
      wiki: false,
      languages: [],

      replies: [
        {
          text: 'First Reply',
          value: null
        },
        {
          text: 'Second Reply',
          value: null
        },
        {
          text: 'Third Reply',
          value: null
        },
        {
          text: 'Fourth Reply',
          value: null
        },
        {
          text: 'Fifth Reply',
          value: null
        }
      ],
      deleteLoading: false,
      handlerName: null,
      form: this.$vform({
        handler: "",
        cooldown: 0,
        enabled: true,
        admin_only: false,
        quote_original: false,
        replies: [],
        reaction: null,
        triggers: [],
        lang: "en",
        match: "exact"
      })
    }
  }, async fetch() {

    const currentAction = await this.$api.messenger.bots.getAction(this.$route.params.bot, this.$route.params.action)
    const {
      handler,
      cooldown,
      enabled,
      admin_only,
      triggers,
      match,
      quote_original,
      replies,
      reaction,

      payload
    } = currentAction
    this.form.handler = handler.alias
    this.handlerName = handler.name
    this.form.cooldown = cooldown
    this.form.enabled = enabled
    this.form.admin_only = admin_only
    this.form.quote_original = quote_original
    this.form.replies = replies
    this.form.reaction = payload?.reaction
        ? this.$messenger.joypixels.shortnameToUnicode(payload?.reaction)
        : null
    this.form.triggers = triggers.join()
    this.form.match = match
    this.form.lang = payload?.lang
    this.handlerSelected(handler.alias, payload)

    const data = await this.$api.messenger.bots.addHandlers(this.$route.params.bot)
    this.actions = data.map(({name, alias}) => ({
      text: name,
      value: alias
    }))

    if (this.$_.findIndex(this.actions, ["value", handler.alias]) === -1)
      this.actions.push({text: handler.name, value: handler.alias})


  },


  computed: {

    hint() {
      return {
        'contains': 'The trigger can be anywhere within a message. Cannot be part of or inside another word.',
        'contains:caseless': 'Same as "contains", but is case insensitive.',
        'contains:any': 'The trigger can be anywhere within a message, including inside another word.',
        'contains:any:caseless': 'Same as "contains any", but is case insensitive.',
        'exact': 'The trigger must match the message exactly.',
        'exact:caseless': 'Same as "exact", but is case insensitive.',
        'starts:with': 'The trigger must be the lead phrase within the message. Cannot be part of or inside another word.',
        'starts:with:caseless': 'Same as "starts with", but is case insensitive .'
      }[this.form.match]
    }
  },

  methods: {
    emojiSelected(emoji) {
      this.form.reaction = emoji.data
    },
    fetchLangs() {
      fetch(
          'https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language&format=json' +
          '&origin=*'
      )
          .then((response) => response.json())
          .then((data) => {
            for (let lang of Object.values(data.sitematrix)) {
              this.languages.push({
                value: lang.code,
                text: lang.name
              })
            }
          })
    },
    handlerSelected(handler, data) {
      this.reply = this.wiki = this.react = false
      if (handler === 'reply') {
        this.form.quote_original = data.quote_original
        this.form.replies = data.replies
        data.replies.forEach((v, k) => (this.replies[k].value = v))
        this.reply = true
      } else if (handler === 'react') {
        this.react = true
      } else if (handler === 'wiki') {
        this.wiki = true
        this.fetchLangs()
      }
    },
    async update() {
      if (this.form.triggers.includes(',')) {
        this.form.triggers = this.form.triggers.split(',')
      } else {
        this.form.triggers = [this.form.triggers]
      }
      this.form.replies = this.replies
          .filter(({value}) => value !== null)
          .map(({value}) => value)

      await this.$api.messenger.bots.updateAction(this.$route.params.bot, this.$route.params.action, this.form)


      this.$toast.success('You have successfully updated this action !')

      await this.$router.push({
        name: 'messenger-threads-thread-index-settings-bots-bot',
        params: {bot: this.$route.params.bot}
      })

    },
    async destroy() {
      await this.$messenger.confirmAlert(`Are you sure you want to delete ${this.handlerName} Action ?`,
          () => this.deleteLoading = true,
          () => this.$api.messenger.bots.deleteAction(this.$route.params.bot, this.$route.params.action),
          () => {
            this.$toast.success('You have successfully deleted this action !')
            this.$router.push({
              name: 'messenger-threads-thread-index-settings-bots-bot',
              params: {bot: this.$route.params.bot}
            })
            this.deleteLoading = false
          },
          () => this.deleteLoading = false
      )


    }

  }
}
</script>
