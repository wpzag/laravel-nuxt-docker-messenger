<template>
  <div class="tw-w-44 ">
    <div :class="ownMessage?'tw-float-right':''" class="tw-relative  tw-inline-block ">
      <v-fade-transition>
        <MessengerBaseIconButton v-if="hovered ||options" icon="vertical-dots" size="4"
                                 textColor="tw-text-skin-secondary/70"
                                 @click="options=!options"></MessengerBaseIconButton>

      </v-fade-transition>

      <template v-if="$store.state.messenger.windowWidth > 767">
        <v-fade-transition>

          <div v-if="options &&  !message.loading "
               :class="{' tw-bottom-8': groupIndex+1===groupsLength && index+1===length}"
               class="
                   tw-absolute
                   tw-inset-x-center
                   dark:tw-bg-black
                   tw-bg-white

                   tw-z-40

                   tw-rounded
                   tw-w-44

">
            <MessengerThreadMessageActionsButtons
                class="tw-text-skin-secondary "
                v-bind="{ message, ownMessage }"
                @closed="options=false"/>

          </div>
        </v-fade-transition>
      </template>
      <template v-else>
        <v-scroll-y-transition>

          <div v-if="options &&  !message.loading "
               class="
                 tw-fixed  tw-inset-0  tw-p-0 tw-w-full tw-bg-black/50 tw-z-40 tw-flex tw-flex-col tw-justify-end


">
            <MessengerThreadMessageActionsButtons
                class="tw-text-skin-secondary tw-p-5 tw-rounded-t-xl tw-bg-skin-background-200"
                v-bind="{ message, ownMessage }"
                @closed="options=false"/>

          </div>
        </v-scroll-y-transition>
      </template>

    </div>


  </div>
</template>
<script>
export default {
  props: ["message", "ownMessage", "index", "length", "groupIndex", "groupsLength", "hovered"], data() {
    return {
      options: false
    }
  }

}
</script>
