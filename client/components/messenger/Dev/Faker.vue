<template>
  <v-overlay
      v-if="show"
      class="text-center"
      opacity=".9"
  >
    <h3 class="white--text mb-3">Faker UI</h3>
    <div>
      <div>
        <v-text-field
            v-model="fakerCount"
            :value="5"
            class="white--text"
            dark
            label="Count"
            outlined
            type="number"
        />
      </div>
      <div>
        <v-select
            v-model="selected"
            :items="[
            { text: 'Current Thread', value: 1 },
            { text: 'Random Thread', value: 2 }
          ]"
            label="Scope"
            outlined
        />
      </div>
    </div>

    <v-btn
        v-for="item in ['random', 'text', 'image', 'document', 'audio', 'system', 'react']"
        :key="item"
        class="mr-2 ml-2"
        @click="faker(item)"
    >
      {{ item }}
    </v-btn>
  </v-overlay>
</template>

<script>

import hotkeys from "hotkeys-js"

export default {
  name: 'Faker',
  data() {
    return {
      show: false,
      selected: 1,
      fakerCount: 5
    }
  }, mounted() {
    hotkeys("f6", (event) => {
      event.preventDefault()
      this.show = !this.show
    })
  },
  methods: {
    async faker(type = null) {
      this.show = false
      await this.$axios.$get(
          '/messenger/faker?id=' +
          this.$store.state.messenger.activeThread.thread?.id +
          '&type=' +
          type +
          '&count=' +
          this.fakerCount +
          '&scope=' +
          this.selected
      )
    }
  }
}
</script>

<style scoped></style>
