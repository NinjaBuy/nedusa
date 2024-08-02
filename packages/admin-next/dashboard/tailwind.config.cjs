import path from "path"

const rootProject = path.join(
  process.cwd(),
  "../../apps/server/src/admin/**/*.{js,jsx,ts,tsx}"
)

// get the path of the dependency "@ninjajs/ui"
const ninjaUI = path.join(
  path.dirname(require.resolve("@ninjajs/ui")),
  "**/*.{js,jsx,ts,tsx}"
)

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@ninjajs/ui-preset")],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ninjaUI,
    rootProject,
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
}
