function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  darkMode: "class",
  prefix: "tw-",
  important: true,

  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    screens: {
      sm: { min: "640px", max: "767px" },
      ssm: { min: "0px", max: "767px" },
      md: { min: "768px", max: "1023px" },

      smd: { min: "0px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      slg: { min: "0px", max: "1279px" },
      xl: { min: "1280px", max: "1535px" },
      "2xl": { min: "1536px" },
    },
    extend: {
      textColor: {
        skin: {
          base: withOpacityValue("--skin-base-text"),
          secondary: withOpacityValue("--skin-secondary-text"),
          caption: withOpacityValue("--skin-caption-text"),
        },
      },
      colors: {
        skin: {
          primary: withOpacityValue("--skin-primary"),
          background: {
            200: withOpacityValue("--skin-background-200"),
            400: withOpacityValue("--skin-background-400"),
            800: withOpacityValue("--skin-background-800"),
          },
          "background-gray": {
            50: withOpacityValue("--skin-background-gray-50"),
          },
          border: withOpacityValue("--skin-base-border"),
        },
      },
      animation: {
        beat: "beat 1s ease-out infinite",
      },
      keyframes: {
        beat: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      fontFamily: {
        display: ["Jaldi", "Arial", "sans-serif"],
        body: ["Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
