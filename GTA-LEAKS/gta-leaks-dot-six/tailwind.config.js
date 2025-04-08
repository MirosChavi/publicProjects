/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Добавь пути к твоим TypeScript и JSX файлам
  ],
  theme: {
    extend: {
      colors: {
        "neon-pink": "#29001A", // Темный, почти черный розовый
        "neon-blue": "#001a33", // Темный, почти черный голубой
      },
    },
  },
  plugins: [],
};
