<template>
  <div>
    <span class=" tw-font-bold  tw-text-skin-base/80 ">{{ name }}</span>
    <span class="tw-text-skin-base/60 ">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: ["name"]
}
</script>
