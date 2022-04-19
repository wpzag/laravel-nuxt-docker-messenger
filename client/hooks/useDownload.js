import {onMounted, ref, useContext} from "@nuxtjs/composition-api"

const useDownload = (url, fileName) => {
    const {$axios} = useContext()

    const success = ref(false)
    const percentage = ref(0)
    const downloading = ref(false)
    const fileSize = ref(0)
    let CancelToken = $axios.CancelToken
    let source = CancelToken.source()

    const cancel = () => {
        source.cancel()
        reset()
    }

    const reset = () => {
        success.value = false
        percentage.value = 0
        downloading.value = false
        CancelToken = $axios.CancelToken
        source = CancelToken.source()
    }
    onMounted(() => {
        getFileSize()
    })

    function humanFileSize(size) {
        let i = Math.floor(Math.log(size) / Math.log(1024))
        return (
            (size / Math.pow(1024, i)).toFixed(2) * 1 +
            " " +
            ["B", "kB", "MB", "GB", "TB"][i]
        )
    }

    const getFileSize = () => {
        $axios
            .head(url)
            .then(
                (response) =>
                    (fileSize.value = humanFileSize(response.headers["content-length"]))
            )
    }
    const toggleDownload = () => {
        downloading.value ? cancel() : download()
    }
    const download = () => {
        downloading.value = true
        $axios({
            url: url,
            cancelToken: source.token,
            method: "GET",
            responseType: "blob",
            onDownloadProgress: (progressEvent) => {
                percentage.value = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                )
                if (percentage.value === 100) success.value = true
            }
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement("a")
                link.href = url
                link.setAttribute("download", fileName) //or any other extension
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                downloading.value = false
            })
            .catch((err) => {
            })
    }

    return {
        toggleDownload,
        download,
        fileSize,
        cancel,
        downloading,
        percentage,
        success
    }
}
export default useDownload
