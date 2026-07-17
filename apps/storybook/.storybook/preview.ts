import type { Preview } from "@storybook/react"
import React from "react"
import "../../../apps/main/src/app/globals.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    themeScope: {
      name: "Theme Scope",
      description: "Global theme scope wrapper class",
      defaultValue: "theme-web",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "theme-web", title: "Web Layout (Teal)" },
          { value: "theme-admin", title: "Admin Layout (Indigo)" },
        ],
        showName: true,
      },
    },
    darkMode: {
      name: "Dark Mode",
      description: "Toggle dark mode class",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light Mode" },
          { value: "dark", title: "Dark Mode" },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const scope = context.globals.themeScope || "theme-web"
      const mode = context.globals.darkMode || "light"

      return React.createElement(
        "div",
        {
          className: `${scope} ${mode === "dark" ? "dark" : ""} min-h-screen bg-background text-foreground p-6 transition-colors`,
        },
        React.createElement(Story),
      )
    },
  ],
}

export default preview
