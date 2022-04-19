export default {
    publicRuntimeConfig: {
        TENOR_GIF_API_KEY: process.env.TENOR_GIF_API_KEY
    },

    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "client",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            {charset: "utf-8"},

            {name: "viewport", content: "width=device-width, initial-scale=1"},

            {hid: "description", name: "description", content: ""},
            {name: "format-detection", content: "telephone=no"}
        ],

        link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["@/assets/css/main.css"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        "@/plugins/lodash",
        "@/plugins/messenger",

        "@/plugins/repository",

        "@/plugins/axios",
        "@/plugins/tippy",
        "@/plugins/uuid",
        "@/plugins/video-player",
        "@/plugins/load-script",
        "@/plugins/idle",

        "@/plugins/vform"
    ],
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        "@nuxt/postcss8",
        "@nuxtjs/google-fonts",
        "@nuxtjs/composition-api/module",
        "@nuxtjs/moment",

        "@nuxtjs/vuetify",
        [
            "@nuxtjs/laravel-echo",
            {
                broadcaster: "pusher",
                key: process.env.SOKETI_APP_KEY,
                wsHost: process.env.HOSTNAME,
                // wsPort: 6001,
                // wssPort: 443,
                forceTLS: true,
                encrypted: true,
                disableStats: true,
                enabledTransports: ["ws", "wss"],
                authModule: true,
                connectOnLogin: true,
                authEndpoint: process.env.API_URL + "/broadcasting/auth"
            }
        ]
    ],
    vuetify: {
        treeShake: true
    },


    googleFonts: {
        families: {
            Jaldi: [100, 300, 700],
            // Niconne: [400],
            Roboto: [400, 700, 900]
        }
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/auth-next",
        "vue-toastification/nuxt",
        "vue-sweetalert2/nuxt"
    ],

    axios: {
        proxy: true,
        credentials: true,
        prefix: process.env.API_URL
    },
    auth: {
        strategies: {
            laravelSanctum: {
                provider: "laravel/sanctum",
                url: process.env.API_URL

            }

        }
    },
    router: {
        middleware: ["auth"]
    },
    toast: {
        timeout: 4000,
        closeOnClick: false
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},

                autoprefixer: {}
            }
        }
    }
}
