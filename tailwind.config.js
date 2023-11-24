module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1636px",
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#1e1e1e",
        lightBlue: "#ecf6ff",
        primary: "#028090",
        lightGray: "#dce6ec",
        statusUrgent: "#ff3f3f",
        statusGood: "#8dde09",
        statusMedium: "#d4900c",
        darkerGray: "#677498",
        lighterGray: "#c2c8e8",
        purple: "#544F97",
        grayOne: "#031927",
      },
      gridTemplateColumns: {
        15: "repeat(15, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
