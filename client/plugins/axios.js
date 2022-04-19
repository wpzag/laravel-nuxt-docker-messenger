export default function ({$axios, error: nuxtError, $toast, app, store}) {
    $axios.onError((error) => {
        const status = error?.response?.status
        if (status === 401) {
            $toast.error("Session Expired, Please log in again to continue .")
            store.dispatch("messenger/reset")
            app.router.push("/login")
        } else if (status === 404) {
            $toast.error("404 , Route not found !")
        } else if (status === 405) {
            $toast.error("Method not allowed for this route !")
        } else if (status === 413) {
            $toast.error("File is too large !")
        } else if (status === 419) {
            $toast.error("CSRF mismatch, please refresh the page .")
            store.dispatch("messenger/reset")
            app.router.push("/login")

        } else if (status === 422) {
            console.log(error)
        } else if (status === 429) {
            $toast.error("Too many requests, try again later ! .")
        } else if (status === 403) {
            $toast.error(
                error.response.data.message ||
                "You are not authorized to perform this action !"
            )
        } else if (status === 500) {
            $toast.error("Server Error !")
        } else {
            if (error?.response?.data) {
                $toast.info(error.response.data, {
                    timeout: 9999999999999,
                    draggable: false,
                    position: "top-center"
                })
            }

            // $toast.error(error.response.data.message, {
            //     timeout: 9999999999999,
            //     draggable: false,
            //     position: 'top-center'
            // })
        }
    })
}
