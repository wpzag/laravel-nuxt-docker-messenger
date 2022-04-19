// In your main vue file - the one where you create the initial vue instance.
import Vue from 'vue'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

// Vue 2.x
// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
    plyr: {}
})
