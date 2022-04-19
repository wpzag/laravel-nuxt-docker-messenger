<template>
  <div>
    <input
        v-show="false"
        ref="avatarUploader"
        accept=".jpg,.jpeg,.png,.gif"
        type="file"
        @change="submit"
    />
    <MessengerBaseAvatar
        :loading="loading"
        :size="size"
        :src="url"
        class="tw-relative tw-group tw-mb-2"
        square

    >
      <div
          class="tw-absolute tw-flex-center tw-inset-x-2 tw-transition-defaults tw-top-3 tw-rounded-2xl tw-bg-black/40"
      >
        <MessengerBaseIconButton

            :size="4"
            class="tw-text-white"
            icon="edit"
            name="Update Avatar"
            @click="$refs.avatarUploader.click()"
        />
      </div>
    </MessengerBaseAvatar>
    <MessengerBaseImageEditor
        v-if="editor"
        :aspectRatio="1 / 1"
        :src="imageEditorUrl"
        @closed="editor=false"
        @submit="submitHandler"
    />
  </div>
</template>
<script>
export default {
  props: ["size", "src", "endpoint"],
  data() {
    return {
      url: null,
      editor: false,
      imageEditorUrl: null,
      loading: false
    }
  },
  created() {
    this.url = this.src
  },
  methods: {
    async submitHandler({image, blob}) {
      this.editor = false
      this.loading = true
      let form = new FormData()
      form.append('image', blob, 'image.jpg')
      const data = await this.$axios.$post(this.endpoint, form)

      this.$emit('uploaded', data)

      this.loading = false
      this.url = data.avatar?.md || data.owner?.avatar?.md

    },
    submit(event) {
      let file = event.target.files[0]
      this.imageEditorUrl = URL.createObjectURL(file)
      this.editor = true
    }
  }
}
</script>
