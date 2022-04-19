import Vue from "vue";
import IdleVue from "idle-vue";

const eventsHub = new Vue();

export default async function ({ app, params, store }, inject) {
  Vue.use(IdleVue, {
    eventEmitter: eventsHub,
    store,
    idleTime: 50000, // 3 seconds
    // idleTime: 60000, // 3 seconds
    startAtIdle: false,
  });
}
