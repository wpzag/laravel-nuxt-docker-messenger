<template>
  <button v-ripple
          class="tw-flex hover:tw-text-skin-base tw-px-4 tw-py-0.5    tw-w-full tw-justify-between tw-items-center "
          v-on="$listeners"
  >
    <div class="tw-text-sm  ">
      {{ name }}

    </div>

    <MessengerBaseIconButton
        :bgColor="$store.getters['messenger/isDark']?'tw-bg-black ssm:tw-bg-skin-background-200' : 'tw-bg-white'"
        :icon="icon"


        :loading="loading" size="5"
    />


  </button>

</template>
<script>

export default {
  props: ['name', 'icon', 'loading']

}
</script>
