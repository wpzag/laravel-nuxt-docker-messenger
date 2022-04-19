<template>
  <div class="tw-fixed-overlay-full tw-flex-center">
    <div class="ms-moving-background tw-py-10 tw-px-20 tw-rounded   tw-flex-center tw-flex-col">
      <!--      <MessengerBaseAvatar :src="$messenger.activeThread().avatar.md" imageSize="10" size="400"/>-->
      <MessengerBaseVibratingAvatar :src="$messenger.activeThread().avatar.md" class="tw-mb-5" size="150"/>
      <h3 class="tw-font-bold tw-mb-2">
        {{ $messenger.activeThread().name }}
      </h3>
      <div class="tw-mb-4">Calling...</div>
      <MessengerBaseBtn :loading="loading" bgColor="tw-bg-red-500" class="tw-hover-scale-md "
                        size="lg"
                        @click="end">
        Hang Up
      </MessengerBaseBtn>


    </div>
  </div>
</template>
<script>

export default {
  props: ['call'], data() {
    return {
      loading: false
    }
  },


  methods: {

    async end() {
      this.loading = true
      await this.$store.dispatch('messenger/thread/call/end', {thread_id: this.call.thread_id, call_id: this.call.id})
      this.loading = false
    }
  }
}
</script>
<style>
.ms-moving-background {
  background: linear-gradient(80deg, #000772, #006696, #002f4e, #009ea7);
  background-size: 800% 800%;

  -webkit-animation: AnimationName 36s ease infinite;
  -moz-animation: AnimationName 36s ease infinite;
  -o-animation: AnimationName 36s ease infinite;
  animation: AnimationName 36s ease infinite;
}
</style>
