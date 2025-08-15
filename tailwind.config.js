import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import themes from 'daisyui/theme/object';


export default  {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors:{
            background: "var(--background)",
            foreground: "var(--foreground)",
        },
    },
  },
  plugins: [daisyui],
  daisyui:{
      themes: ["dark"],
      darkTheme: "dark",
  },
  darkMode: "class", // Enable dark mode supports
  
}satisfies Config;
