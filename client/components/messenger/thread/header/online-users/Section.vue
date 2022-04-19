<template>

  <div class="tw-space-y-3">
    <div class="tw-text-sm tw-text-indigo-400">{{ title }}</div>

    <div v-for="participant in list"
         class="tw-flex tw-space-x-2 tw-items-center"
    >
      <MessengerBaseAvatar :src="participant.owner.avatar.sm" :status="participant.owner.options.online_status"
                           size="2"
                           statusPosition="tw--right-2 tw--bottom-1"/>
      <div class="tw-text-xs">{{ participant.owner.name }}
   

      </div>
    </div>


  </div>


</template>

<script>


export default {
  props: ['list', 'title']

}
</script>
