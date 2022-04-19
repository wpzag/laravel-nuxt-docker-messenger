<template>
  <div v-click-outside="()=> {show=false}"
       class=" tw-relative  ">
    <MessengerThreadFooterButton
        :class="show?'tw-text-skin-base':'tw-text-skin-primary hover:tw-text-skin-primary-500/80'" icon="gift"
        @click="show = !show"/>
    <v-slide-y-transition>
      <div v-if="show"
           class="tw-absolute  z-50 tw--top-[32rem] tw--left-10 ssm:tw--left-17 tw-bg-skin-background-400 tw-shadow tw-rounded tw-dark ">
        <div class="tw-relative ">
          <div class="tw-flex tw-items-center my-4 tw-p-5  ">
            <div :class="searchMode?'tw-w-12 tw-opacity-100':'tw-w-0 tw-opacity-0'" class="tw-transition-defaults ">
              <a @click="clear">
                <MessengerBaseIcon class="tw-cursor-pointer tw-text-skin-secondary tw-flex-shrink-0"
                                   name="arrow-left-small" size="6"
                />
              </a>
            </div>
            <v-text-field
                v-model="search"
                dark
                dense
                hide-details
                outlined
                placeholder="search"
                @keyup="searchInput"
            />

          </div>
          <div
              class="tw-h-96 tw-w-96 tw-scrollbar tw-scrollbar-track-transparent tw-scrollbar-thumb-gray-300 dark:tw-scrollbar-thumb-neutral-800 tw-scrollbar-thin  tw-overflow-auto tw-px-4"
              @scroll="onScroll"
          >
            <div v-if="!searchMode" class="tw-grid  tw-grid-flow-row tw-grid-cols-2 tw-gap-1">
              <div
                  v-for="cat in cats"
                  :key="cat.searchterm"
                  class="tw-border-transparent tw-border-2 tw-transition-all tw-cursor-pointer rounded-lg tw-overflow-hidden hover:tw-border-skin-primary"
              >
                <v-img
                    :src="cat.image"

                    height="130"
                    @click="selected(cat.searchterm)"
                >
                  <v-overlay absolute opacity=".6">
                  <span class="white--text">
                    {{ cat.searchterm }}
                  </span>
                  </v-overlay>
                  <template v-slot:placeholder>
                    <v-skeleton-loader dark type="image"></v-skeleton-loader>
                  </template>
                </v-img>
              </div>
            </div>
            <div v-else class="tw-grid  tw-grid-flow-row tw-grid-cols-2 tw-gap-1">
              <div
                  v-for="gif in gifs"
                  :key="gif.id"
                  class="tw-border-transparent tw-border-2 tw-transition-all tw-cursor-pointer rounded-lg tw-overflow-hidden hover:tw-border-skin-primary"
              >
                <v-img
                    :src="gif.tinygif"
                    height="200"
                    @click="submit(gif)"
                >
                  <template v-slot:placeholder>
                    <v-skeleton-loader
                        dark
                        height="300px"
                        type="image"
                    />
                  </template>
                </v-img>
              </div>
            </div>
          </div>
        </div>

      </div>

    </v-slide-y-transition>
  </div>


</template>

<script>
const debounce = require('lodash/debounce')
export default {

  data() {
    return {
      search: '',
      gifs: [],
      show: false,
      searchMode: false,
      limit: 8,
      pos: null,
      cats: [],
      api: null
    }
  },

  mounted() {
    this.api = this.$config.TENOR_GIF_API_KEY
    fetch(`https://g.tenor.com/v1/categories?key=${this.api}&media_filter=minimal`)
        .then((res) => res.json())
        .then((json) => (this.cats = json.tags))
  },
  watch: {
    search(val) {
      if (val === '') {
        this.searchMode = false
      }
    }
  },
  methods: {
    async submit(src) {
      this.show = false

      // let response = await fetch(src);
      // let file = await response.blob();
      let id = this.$uuid()
      await this.$store.dispatch('messenger/thread/messages/store', {
        message: {
          id: id,
          temporary_id: id,
          type: 0,
          message: src.gif,
          body: src.gif,
          owner_id: this.$auth.user.id,
          owner: this.$auth.user,
          // reply_to_id: reply_to ? reply_to.id : null,
          loading: true,
          extra: {type: "gif", dimensions: {width: src.dims[0], height: src.dims[1]}}
        }
      })
    },
    clear() {
      this.search = ''
      this.searchMode = false
    },
    async selected(q) {
      this.search = q
      this.searchMode = true
      this.searchGifs()
    },
    onScroll({target: {scrollTop, clientHeight, scrollHeight}}) {
      // if (this.loaded) return;
      if (scrollTop + clientHeight >= scrollHeight && this.searchMode) {
        this.searchGifs(false)
        // this.$store.commit("notifications/update");
      }
    },

    searchInput: debounce(function () {
      this.searchGifs()
    }, 400),

    searchGifs(init = true) {
      if (init) {
        this.gifs = []
        this.pos = 0
      }

      let endPoint = 'https://g.tenor.com/v1/search?'
      let url = `${endPoint}key=${this.api}&q=${this.search}&limit=${this.limit}&media_filter=minimal`
      if (this.pos) url += '&pos=' + this.pos

      fetch(url)
          .then((response) => {
            return response.json()
          })
          .then((json) => {
            this.pos = json.next
            this.buildGifs(json.results)
            this.searchMode = true
          })
          .catch((err) => console.log(err))
    },
    buildGifs(json) {
      const arr = json.map((gif) => ({
        gif: gif.media[0].gif.url,
        dims: gif.media[0].gif.dims,
        tinygif: gif.media[0].tinygif.url
      }))

      this.gifs = [...this.gifs, ...arr]
    }
  }
}
</script>
