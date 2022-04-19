<template>
  <MessengerThreadSettingPage :back="$messenger.path('threads.current.settings.bots.current')"
                              :loading="$fetchState.pending"
                              name="Create Action">

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

              v-model="replies[0].value"
              :label="replies[0].text"
              outlined
          />
          <v-text-field

              v-model="replies[1].value"
              :label="replies[1].text"
              outlined
          />
          <v-text-field

              v-model="replies[2].value"
              :label="replies[2].text"
              outlined
          />
          <v-text-field

              v-model="replies[3].value"
              :label="replies[3].text"
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
      <div class="tw-flex tw-justify-end">

        <MessengerBaseBtn :loading="form.busy" size="lg" @click="submit">Create</MessengerBaseBtn>
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
    const data = await this.$api.messenger.bots.addHandlers(this.$route.params.bot)
    this.actions = data.map(({name, alias}) => ({
      text: name,
      value: alias
    }))
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
  }, methods: {
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
    handlerSelected(handler) {
      this.reply = this.wiki = this.react = false
      if (handler === 'reply') {
        this.reply = true
      } else if (handler === 'react') {
        this.react = true
      } else if (handler === 'wiki') {
        this.fetchLangs()
        this.wiki = true
      }

    },
    async submit() {
      if (this.form.triggers.includes(',')) {
        this.form.triggers = this.form.triggers.split(',')
      } else {
        this.form.triggers = [this.form.triggers]
      }
      this.form.replies = this.replies
          .filter(({value}) => value !== null)
          .map(({value}) => value)

      await this.$api.messenger.bots.storeAction(this.$route.params.bot, this.form)


      this.$toast.success('You have successfully created a new action !')

      await this.$router.push({
        name: 'messenger-threads-thread-index-settings-bots-bot',
        params: {bot: this.$route.params.bot}
      })

    }
  }
}
</script>
