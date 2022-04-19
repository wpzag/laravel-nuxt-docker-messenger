import UploadingBar from "@/components/messenger/thread/footer/UploadingBar"
import useColors from "@/hooks/useColors"

export default async function (
    {app, params, store, $_, $toast, $axios, $auth},
    inject
) {
    const {getColor} = useColors()
    const messenger = {
        message: {},
        thread: {},
        path: {},
        to: {}
    }
    messenger.joypixels = require("emoji-toolkit")

    messenger.linkify = (text) => {
        // http://, https://, ftp://
        let urlPattern =
            /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim

        // www. sans http:// or https://
        let pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim

        // Email addresses
        let emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim

        return text
            .replace(urlPattern, '<a href="$&">$&</a>')
            .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
            .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>')
    }

    messenger.path = (name = "threads.current.settings.bots.current") => {
        let routArray = ["messenger", ...name.split(".")]

        const {thread, bot, action} = app.router.currentRoute.params
        routArray = routArray.map((el, index) => {
            if (el !== "current") return el

            const prev = routArray[index - 1]
            if (!prev) return
            return {
                threads: thread,
                bots: bot,
                actions: action
            }[prev]
        })

        const route = routArray.join("/")

        return "/" + route
    }

    messenger.to = (name, replace = false, extra = null) => {
        let verb = replace ? "replace" : "push"

        let path = messenger.path(name)
        if (extra) path += extra

        app.router[verb](path)
    }

    messenger.isActiveThread = (id) => {
        return messenger.activeThreadId() === id
    }
    messenger.activeThread = () => {
        return store?.state?.messenger?.activeThread?.thread
    }
    messenger.activeThreadId = () => {
        return store?.state?.messenger?.activeThread?.thread?.id
    }
    messenger.scrollToBottom = (force = false, smooth = false, msgHeight = 0) => {
        let threadBox = document.getElementById("thread-box")
        if (threadBox?.classList.contains("tw-scroll-smooth"))
            threadBox?.classList.remove("tw-scroll-smooth")
        if (smooth) threadBox?.classList.add("tw-scroll-smooth")
        if (!threadBox) return false
        let top = threadBox.scrollTop,
            height = threadBox.scrollHeight,
            offset = threadBox.offsetHeight
        if (
            force ||
            top === height - offset ||
            height - offset - top < parseInt(msgHeight) + 300
        ) {
            threadBox.scrollTop = threadBox.scrollHeight
            return true
        }
        if (smooth)
            setTimeout(() => threadBox?.classList.remove("tw-scroll-smooth"), 100)

        return false
    }
    messenger.confirmAlert = (
        text,
        beforeRequest,
        request,
        confirmed,
        notConfirmed
    ) => {
        app.$swal
            .fire({
                type: "error",
                title: text,
                reverseButtons: true,
                showCancelButton: true,
                confirmButtonColor: getColor("skin-primary"),
                confirmButtonText: `Yes`,
                denyButtonText: `Cancel`
            })
            .then(async (result) => {
                if (!result.isConfirmed) return notConfirmed()
                beforeRequest()
                await request()
                confirmed()
                app.$toast.success("Successful operation !")
            })
    }

    messenger.message.find = (id, list) => {
        let groupIndex, messageIndex, message
        if (!Array.isArray(list)) return
        list.forEach((group, gIndex) => {
            group.messages.forEach((msg, mIndex) => {
                if (msg.id === id) {
                    groupIndex = gIndex
                    messageIndex = mIndex
                    message = msg
                }
            })
        })
        return {groupIndex, messageIndex, message}
    }
    messenger.message.getType = (message) => {
        const type = message.type
        if (type === 0) {
            if (message?.extra?.type === "gif") return "gif"
            if (message?.extra?.type === "code") return "code"
            if (message?.extra?.type === "wiki") return "wiki"
            if (message?.extra?.type === "youtube") return "youtube"
            return "text"
        }
        if (type === 1) return "image"
        if (type === 2) return "file"
        if (type === 3) return message.extra?.type === "voice" ? "voice" : "audio"
        if (type === 4) return "video"
        return "system"
    }
    messenger.message.parse = (message) => {
        return messenger.joypixels.shortnameToUnicode(
            messenger.linkify(message.body)
        )
    }
    messenger.message.parseLatestMessage = (thread) => {
        let message = $_.cloneDeep(thread.resources.latest_message)
        const name =
            message.owner.provider_id === app.$auth.user.id
                ? "YOU : "
                : thread.type === 2
                    ? message.owner.name + " : "
                    : ""
        message.type = messenger.message.getType(message)

        return (
            {
                voice: `${name}sent a voice message`,
                audio: `${name}sent an audio file`,
                image: `${name}sent an image`,
                file: `${name}sent a file`,
                video: `${name}sent a video`,
                youtube: `${name}sent a youtube video`,
                wiki: `${name}sent a wiki message`,
                code: `${name}sent a code snippet`,
                gif: `${name}sent a gif`,
                system: `${message.owner.name} ${message.body}`,
                text: `${name}${messenger.joypixels.shortnameToUnicode(
                    message.body.substring(0, 30)
                )}`
            }[message.type] + " ." ?? `${name}sent a message`
        )
    }
    messenger.message.getDimensions = (message) => {
        const {width, height} = message.extra.dimensions
        let maxWidth = window.innerWidth < 400 ? window.innerWidth - 100 : 400
        let maxHeight = window.innerHeight < 700 ? window.innerHeight - 100 : 700

        let ratio = Math.min(maxWidth / width, maxHeight / height)

        return {width: width * ratio, height: height * ratio}
    }

    messenger.message.upload = (props) => {
        $toast(
            {
                component: UploadingBar,
                props: {
                    ...props,
                    $axios,
                    $toast,
                    store
                }
            },
            {
                timeout: false,
                position: "bottom-right",
                toastClassName: "ms-upload-toast",
                icon: false,
                closeButton: false,
                transition: "fade"
            }
        )
    }
    messenger.thread.find = (id) => {
        const index = $_.findIndex(store.state.messenger.threads.list, ["id", id])
        if (index === -1) return null
        return index
    }

    inject("messenger", messenger)
}
