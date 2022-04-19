<template>
  <div
      class="tw-space-y-3 tw-opacity-60 tw-h-screen tw-px-4 tw-flex tw-relative tw-flex-auto tw-flex tw-flex-col"
  >
    <div
        class="tw-flex tw-justify-between  tw-items-center tw-px-6 tw-py-4 tw-mx-auto tw-w-full tw-border-b  tw-border-skin-border"
    >
      <div class="tw-flex tw-items-center tw-space-x-5">
        <MessengerBaseAvatar
            :src="null"
            size="5"

        />
        <div class="tw-text-xl tw-font-display tw-font-bold">
          <div class="tw-shimmer tw-w-24 tw-h-3 tw-mb-3"></div>
          <div class="tw-shimmer tw-w-6 tw-h-2"></div>

        </div>
      </div>

      <!--      <div class="tw-text-gray-100 flex tw-space-x-3">-->
      <!--        <MessengerBaseIcon name="call" size="5"/>-->


      <!--        <MessengerBaseIcon name="vertical-dots" size="5"/>-->
      <!--      </div>-->
      <div>
      </div>
    </div>

    <div class="tw-overflow-hidden">
      <div v-for="n in 20"

           :class="{'tw-flex-row-reverse':n % 2 === 0}"
           class="tw-flex tw-mt-5">
        <div class="tw-shimmer tw-rounded-full tw-w-8 tw-h-8 tw-mx-3 tw-place-self-end"/>

        <div
            class="tw-w-3/6 "
        >
          <div :class="{'tw-text-right':n % 2 === 0}" class="tw-mx-1"
          >
            <div
                class="tw-shimmer tw-h-2 tw-w-12 tw-rounded tw-inline-block   "/>

          </div>
          <div :style="`height:${[30,40,50,60][Math.floor(Math.random() * 4)]}px` "
               class="tw-shimmer tw-w-full tw-rounded-2xl"></div>

          <div v-for="n in 2" v-if="Math.random() < 0.5" class="tw-mt-2">

            <div :style="`height:${[30,40,50,60][Math.floor(Math.random() * 4)]}px` "
                 class="tw-shimmer tw-w-full tw-rounded-2xl"></div>
          </div>


        </div>


      </div>

    </div>
    <div class="tw-flex-none tw-relative  ">

      <div
          class="tw-flex tw-items-center tw-p-4 tw-space-x-2 "
      >
        <div class="tw-shimmer tw-rounded-xl tw-w-8 tw-h-8  "/>
        <div class="tw-shimmer tw-rounded-xl tw-w-8 tw-h-8  "/>
        <div class="tw-shimmer tw-rounded-xl tw-w-8 tw-h-8  "/>
        <div class="tw-shimmer tw-rounded-xl tw-flex-1 tw-h-8  "/>
        <div class="tw-shimmer tw-rounded-xl tw-w-8 tw-h-8  "/>

      </div>
    </div>

  </div>

</template>
<script>
export default {
  mounted() {
    this.$messenger.scrollToBottom(true)
  }
}
</script>
