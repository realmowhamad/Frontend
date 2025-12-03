import type { Config } from "tailwindcss";

const config: Config = {
  darkMode:"class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./Layout/**",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        meow: ["Meow Script"],
        notoSans: ["Noto Sans"],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        Parisienne: ["Parisienne"],
        
      },
      colors: {
        primary: {
          50: "#f7f6ef",
          100: "#ece7d5",
          200: "#dbcfad",
          300: "#c5b07f",
          400: "#ba9e68",
          500: "#a5844d",
          600: "#8e6a40",
          700: "#725136",
          800: "#614432",
          900: "#543c2f",
          950: "#301f18",
        },
        secondary: "var(--secondary)",
        info: "var(--info)",
        warning: "var(--warning)",
        success: "var(--success)",
        danger: "var(--danger)",
      },
      borderRadius: {
        custom: "var(--customBorderRadius)",
      },
      animation: {
        "slide-in": "slideIn 0.5s forwards",
        rotation: "rotate 60s ease  infinite",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        rotate: {
          "0%": {
            transform: "rotate(0)",
          },
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
