export const state = () => ({
  dropzone: false,

  file: null,
  type: null,
  ext: null,
  fileName: null,
  fileSize: null,
  url: null,

  fileViewer: false,
  imageEditor: false,
  codeEditor: false,
  audioRecorder: false,
});

export const mutations = {
  dropzone(state, payload) {
    state.dropzone = payload;
  },
  codeEditor(state, payload) {
    state.codeEditor = payload;
  },
  audioRecorder(state, payload) {
    state.audioRecorder = payload;
  },
  fileViewer(state, payload) {
    state.fileViewer = payload;
  },
  reset(state, payload) {
    state.dropzone = false;

    state.file = null;
    state.type = null;
    state.ext = null;
    state.fileName = null;
    state.fileSize = null;
    state.url = null;

    state.fileViewer = false;
    state.imageEditor = false;
  },
  async setFileInfo(state, file) {
    state.file = file;

    state.fileName = file?.name;
    state.ext = state.fileName?.split(".").pop();

    let i = Math.floor(Math.log(state.file?.size) / Math.log(1024));
    state.fileSize =
      (state.file?.size / Math.pow(1024, i)).toFixed(2) * 1 +
      " " +
      ["B", "kB", "MB", "GB", "TB"][i];
  },
};
export const actions = {
  upload({ state, commit, rootState }, file) {
    commit("dropzone", false);

    // Set File Info
    commit("setFileInfo", file);
    let config = rootState.messenger.config;
    let type = () => {
      if (config.messageImageMimeTypes.split(",").includes(state.ext))
        return "image";
      if (config.messageVideoMimeTypes.split(",").includes(state.ext))
        return "video";
      if (config.messageAudioMimeTypes.split(",").includes(state.ext))
        return "audio";
      if (config.messageDocumentMimeTypes.split(",").includes(state.ext))
        return "document";
      return null;
    };
    state.type = type();
    if (state.type === "image") {
      state.url = URL.createObjectURL(state.file);
      state.imageEditor = true;
    } else if (["video", "audio", "document"].includes(state.type)) {
      state.fileViewer = true;
    } else {
      this.$toast.error("This file format isn't supported");
    }
  },
  uploadFile({ rootState, state }) {
    state.fileViewer = false;
    let extra = null;

    const upload = (extra) =>
      this.$messenger.message.upload({
        threadId: rootState.messenger.activeThread.thread.id,
        file: state.file,
        type: state.type,
        fileName: state.fileName,
        icon: state.type === "audio" ? "music" : "file",
        extra,
      });
    if (state.type === "video") {
      const url = URL.createObjectURL(state.file);
      const $video = document.createElement("video");
      $video.src = url;

      $video.addEventListener("loadedmetadata", () => {
        extra = {
          dimensions: {
            width: $video.videoWidth,
            height: $video.videoHeight,
          },
        };
        return upload(extra);
      });
    } else {
      upload();
    }
  },
  uploadImage({ rootState, state, commit }, { image, blob, dimensions }) {
    state.url = image;
    state.imageEditor = false;
    this.$messenger.message.upload({
      threadId: rootState.messenger.activeThread.thread.id,
      file: blob,
      type: "image",
      fileName: state.fileName,
      icon: "image",
      extra: { dimensions },
    });
    commit("reset");
  },
  uploadCode({ rootState, state, dispatch }, code) {
    state.codeEditor = false;
    let id = this.$uuid();
    dispatch(
      "messenger/thread/messages/store",
      {
        message: {
          id: id,
          temporary_id: id,
          type: 0,
          message: code,
          body: code,
          owner_id: this.$auth.user.id,
          owner: this.$auth.user,
          // reply_to_id: reply_to ? reply_to.id : null,
          loading: true,
          extra: { type: "code" },
        },
      },
      { root: true }
    );
  },
};
