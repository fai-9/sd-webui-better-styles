/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./client-src/styles/*.css}"],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'media',
  corePlugins: {
    preflight: false,
  },
};
