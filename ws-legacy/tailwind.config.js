module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideDown: "slideDown 1s ease-in-out",
        slideUp: "slideUp 1s ease-in-out",
      },
      fontFamily: {
        pretendard: "var(--font-pretendard)",
      },
      screens: {
        mobile: { max: "1024px" },
        // => @media (min-width: 640px) { ... }
      },
      colors: {
        "white-normal": "#FFFFFF",
        "white-light": "rgba(255,255,255,0.2)",
        "black-normal": "#292929",
        "black-light": "#2E3135",
        "black-lighter": "rgba(0,0,0,0.4)",
        "black-lightest": "rgba(0,0,0,0.05)",
        "gray-normal": "#5C5C5C",
        "gray-light": "#A6A6A6",
        "gray-lighter": "#D5D5D5",
        "gray-lightest": "#E6E6E6",
        "gray-bright": "#F9F8F9",
        "red-normal": "#FF5C5C",
        "red-light": "#FFC1C8",
        "green-normal": "#3ACF59",
        "green-light": "#D7EFDC",
        "green-dark": "#0F7134",
        "blue-dark": "#3658D1",
        "blue-normal": "#416BFF",
        "blue-light": "#E6F0FF",
        "blue-lighter": "#F3F5F7",
        "blue-lightest": "#FBFBFB",
        "yellow-normal": "#FEEDAF",
        "yellow-dark": "#F0CB3D",
        "mint-light": "#D7E6EB",
      },
      fontSize: {
        "6xl": [
          "96px",
          { lineHeight: "110px", letterSpacing: "-0.2px", fontWeight: 800 },
        ],
        "5xl": [
          "63px",
          { lineHeight: "85px", letterSpacing: "-0.032px", fontWeight: 800 },
        ],
        "4xl": [
          "52px",
          { lineHeight: "72px", letterSpacing: "-0.032px", fontWeight: 700 },
        ],
        "3xl": [
          "42px",
          { lineHeight: "54px", letterSpacing: "-0.032px", fontWeight: 700 },
        ],
        "2xl": [
          "30px",
          { lineHeight: "42px", letterSpacing: "-0.032px", fontWeight: 600 },
        ],
        xl: [
          "24px",
          { lineHeight: "34px", letterSpacing: "-0.032px", fontWeight: 600 },
        ],
        lg: [
          "18px",
          { lineHeight: "26px", letterSpacing: "-0.032px", fontWeight: 600 },
        ],
        md: [
          "15px",
          { lineHeight: "23px", letterSpacing: "-0.032px", fontWeight: 500 },
        ],
        sm: [
          "13px",
          { lineHeight: "23px", letterSpacing: "-0.032px", fontWeight: 400 },
        ],
        xs: [
          "12px",
          { lineHeight: "18px", letterSpacing: "0%", fontWeight: 400 },
        ],
        boldlg: [
          "20px",
          { lineHeight: "26px", letterSpacing: "-0.032px", fontWeight: 700 },
        ],
        boldmd: [
          "15px",
          { lineHeight: "23px", letterSpacing: "-0.032px", fontWeight: 600 },
        ],
        boldsm: [
          "13px",
          { lineHeight: "18px", letterSpacing: "-0.032px", fontWeight: 600 },
        ],
      },
      boxShadow: {
        card: "0px 4px 2px 0px rgba(255, 255, 255, 0.12) inset, 0px 0px 2px 0px rgba(0, 0, 0, 0.05), 0px 0px 12px 0px rgba(0, 0, 0, 0.15)",
      },
      dropShadow: {
        blue: [
          "0px 0px 2px 0px rgba(0, 0, 0, 0.05) inset",
          " 0px 0px 12px 0px rgba(0,0,0,0.15)",
        ],
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
