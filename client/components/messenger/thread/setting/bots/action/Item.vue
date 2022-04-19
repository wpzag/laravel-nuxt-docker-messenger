<template>

  <div class="tw-border tw-border-dashed tw-border-skin-border dark:tw-border-white/10 tw-pb-4 tw-px-4">
    <div
        class="tw-flex tw-justify-between tw-items-center  tw-mb-4 tw-border-b tw-border-skin-border tw-border-dashed   && ownMessage  tw-h-14">

      <span class="tw-font-bold tw-text-skin-base/80">{{ action.handler.name }}</span>
      <div>
        <div
            v-if="action.admin_only"
            class="tw-bg-indigo-500 tw-text-white tw-px-2 tw-py-1 tw-text-xs tw-rounded"
        >
          Admin
        </div>
        <nuxt-link v-else :to="$messenger.path(`threads.current.settings.bots.current.actions.${action.id}`)">
          <MessengerBaseIconButton

              :size="5"
              class="tw-text-skin-caption hover:tw-text-skin-base"
              icon="edit"
              name="Edit"
          />
        </nuxt-link>

      </div>


    </div>

    <div class=" tw-cursor-pointer tw-text-sm" @click="expanded=!expanded">

      <MessengerThreadSettingBotsActionSection class="tw-mb-3" @click="expanded=!expanded">


        {{ action.handler.description }}
      </MessengerThreadSettingBotsActionSection>
      <MessengerThreadSettingBotsActionSection class="tw-mb-3" name="Triggers : ">
        <!--            <v-chip-->
        <!--                v-for="(trigger,index) in action.triggers"-->
        <!--                class="tw-mx-3"-->
        <!--                label-->
        <!--                x-small-->
        <!--            >{{ trigger }}-->
        <!--            </v-chip>-->
        <span
            v-for="(trigger,index) in action.triggers"

        > <span v-if="index !==0">,</span> {{ trigger }}
                        </span>


      </MessengerThreadSettingBotsActionSection>
      <v-expand-transition>
        <div v-if="expanded" class="tw-space-y-4">
          <MessengerThreadSettingBotsActionSection name="Status : ">
            <b
                :class="action.enabled ? 'tw-text-green-500' : 'tw-text-red-500'"
            >{{ action.enabled ? "Enabled" : "Disabled" }}</b
            >
          </MessengerThreadSettingBotsActionSection>
          <MessengerThreadSettingBotsActionSection name="Cooldown : ">
            {{ action.cooldown }}
          </MessengerThreadSettingBotsActionSection>

          <MessengerThreadSettingBotsActionSection

              name="Matches : "
          >
            <!--            <v-chip-->
            <!--                label-->
            <!--                small-->
            <!--            >-->
            {{ action.match }}
            <!--            </v-chip>-->


          </MessengerThreadSettingBotsActionSection>

          <div class="tw-text-skin-secondary">{{ action.match_description }}</div>
        </div>
      </v-expand-transition>

    </div>

  </div>

</template>
<script>
export default {
  props: ["action"],
  data() {
    return {
      expanded: false
    }
  }
}
</script>
