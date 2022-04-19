import Vue from "vue"
import VueTippy, {TippyComponent} from "vue-tippy"

Vue.use(VueTippy, {
    interactive: true,
    theme: "light",
    animateFill: false,
    arrow: true,
    touch: false,
    arrowType: "round",
    placement: "bottom"
})
Vue.component("tippy", TippyComponent)
