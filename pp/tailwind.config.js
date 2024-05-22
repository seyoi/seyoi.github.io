/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard"],
      },
      colors: {
        "ppWhite": "#FFFFFF",
        "ppBlack": "#2A3547",
        "ppBlue": "#5D87FF",
        "ppGray": "#5A6A85",
        "ppLightGray": "#7C8FAC",
        "ppVeryLightGray": "#868EAB",
        "ppHoverBlue": "#539BFF",
        "ppMoveBlue": "#4673F4",
      },
    },
  },
  plugins: [],
};
