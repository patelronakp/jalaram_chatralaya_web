const sharedConfig = require("@repo/tailwind-config")

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    ...sharedConfig.content,
    "../../packages/*/src/**/*.{ts,tsx}"
  ]
}
