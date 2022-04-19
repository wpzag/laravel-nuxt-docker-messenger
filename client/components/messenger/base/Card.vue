<template>
  <div class=" tw-border tw-border-skin-border">
    <div
        class="tw-p-4     tw-flex tw-justify-between tw-items-center tw-text-xs"
    >
      <div class="tw-relative">
        <slot name="header"></slot>
        <div class=" -tw-bottom-0 h-1 w-3 tw-bg-skin-primary ">ds</div>
      </div>
    </div>

    <div
        class="dark:tw-bg-skin-background-400/40  tw-text-sm  "
    >
      <slot></slot>
    </div>
    <!--    -->
    <!--    <div-->
    <!--        class="tw-p-4 tw-bg-gray-100 dark:tw-bg-skin-background-400 tw-border tw-border-skin-border tw-border-b-0 dark:tw-border-transparent   tw-flex tw-justify-between tw-items-center tw-text-xs"-->
    <!--    >-->
    <!--      <slot name="header"></slot>-->
    <!--    </div>-->

    <!--    <div-->
    <!--        class="dark:tw-bg-skin-background-400/40 tw-border tw-border-skin-border dark:tw-border-transparent tw-text-sm  "-->
    <!--    >-->
    <!--      <slot></slot>-->
    <!--    </div>-->
  </div>
</template>
