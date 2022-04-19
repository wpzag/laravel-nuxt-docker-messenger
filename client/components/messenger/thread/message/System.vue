<template>
  <div class=" tw-my-6 tw-text-skin-secondary tw-text-center tw-w-full tw-text-sm">
    <!--    <MessengerBaseIcon class="tw-inline-block tw-mr-2" name="video-camera" size="4"/>-->
    {{ message.owner.name }} {{ message.body }}
  </div>
</template>

<script>

export default {
  props: ["message"]


}
</script>
