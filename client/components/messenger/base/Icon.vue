<template>
  <component :is="iconComponent" :class="`tw-h-${size} tw-w-${size}`"/>
</template>

<script>
const icons = {
  chat: require("./Icons/ChatIcon.vue").default,
  logout: require("./Icons/LogoutIcon.vue").default,
  setting: require("./Icons/SettingIcon.vue").default,
  bell: require("./Icons/BellIcon.vue").default,
  search: require("./Icons/SearchIcon.vue").default,
  plus: require("./Icons/PlusIcon.vue").default,
  close: require("./Icons/CloseIcon.vue").default,
  image: require("./Icons/ImageIcon.vue").default,
  send: require("./Icons/SendIcon.vue").default,
  crop: require("./Icons/CropIcon.vue").default,
  mic: require("./Icons/MicIcon.vue").default,
  call: require("./Icons/CallIcon.vue").default,
  link: require("./Icons/LinkIcon.vue").default,
  bot: require("./Icons/BotIcon.vue").default,
  play: require("./Icons/PlayIcon.vue").default,
  pause: require("./Icons/PauseIcon.vue").default,
  download: require("./Icons/DownloadIcon.vue").default,
  adjustments: require("./Icons/AdjustmentsIcon.vue").default,
  music: require("./Icons/MusicIcon.vue").default,
  file: require("./Icons/FileIcon.vue").default,
  attachment: require("./Icons/AttachmentIcon.vue").default,
  code: require("./Icons/CodeIcon.vue").default,
  emoji: require("./Icons/EmojiIcon.vue").default,
  trash: require("./Icons/TrashIcon.vue").default,
  stop: require("./Icons/StopIcon.vue").default,
  check: require("./Icons/CheckIcon.vue").default,
  copy: require("./Icons/CopyIcon.vue").default,
  info: require("./Icons/InfoIcon.vue").default,
  crown: require("./Icons/CrownIcon.vue").default,
  knock: require("./Icons/KnockIcon.vue").default,
  edit: require("./Icons/EditIcon.vue").default,
  gift: require("./Icons/GiftIcon.vue").default,
  message: require("./Icons/MessageIcon.vue").default,
  upload: require("./Icons/UploadIcon.vue").default,
  reply: require("./Icons/ReplyIcon.vue").default,
  brightness: require("./Icons/BrightnessIcon.vue").default,
  moon: require("./Icons/MoonIcon.vue").default,
  wifi: require("./Icons/WifiIcon.vue").default,
  clock: require("./Icons/ClockIcon.vue").default,
  menu: require("./Icons/MenuIcon.vue").default,
  "eye-off": require("./Icons/EyeOffIcon.vue").default,
  "bell-off": require("./Icons/BellOffIcon.vue").default,
  "vertical-dots": require("./Icons/VerticalDotsIcon.vue").default,
  "arrow-right": require("./Icons/ArrowRightIcon.vue").default,
  "arrow-up": require("./Icons/ArrowUpIcon.vue").default,
  "arrow-down": require("./Icons/ArrowDownIcon.vue").default,
  "close-rounded": require("./Icons/CloseRoundedIcon.vue").default,
  "plus-rounded": require("./Icons/PlusRoundedIcon.vue").default,
  "arrow-left-small": require("./Icons/ArrowLeftSmall.vue").default,
  "user-add": require("./Icons/UserAddIcon.vue").default,
  "video-camera": require("./Icons/VideoCameraIcon.vue").default,
  "rotate-right": require("./Icons/RotateRightIcon.vue").default,
  "rotate-left": require("./Icons/RotateleftIcon.vue").default,
  "user-group": require("./Icons/UserGroupIcon.vue").default,
  "zoom-in": require("./Icons/ZoomInIcon.vue").default,
  "zoom-out": require("./Icons/ZoomOutIcon.vue").default
}

export default {
  props: ["name", "size"],

  computed: {
    iconComponent() {
      return icons[this.name]
    }
  }
}
</script>
