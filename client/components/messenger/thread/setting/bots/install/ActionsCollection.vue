<template>
  <div class="tw-text-sm  tw-space-y-4 ">
    <div class="dark:tw-bg-[#3b4042] tw-bg-gray-200   tw-p-3 tw-flex-center">
      <span class="tw-font-bold   ">{{ name }} :</span>
    </div>

    <div v-for="action in items"><span class="tw-font-bold tw-text-skin-base/80">{{ action.name }} :</span>
      <span
          class="tw-text-skin-base/40 ">{{ action.description }} </span></div>
  </div>

</template>
<script>
export default {
  props: ['items', 'name']
}
</script>
