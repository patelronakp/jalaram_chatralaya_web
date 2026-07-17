import type { StorybookConfig } from "@storybook/nextjs"
import * as path from "path"

const config: StorybookConfig = {
  stories: ["../../../packages/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../../../apps/main/src"),
      }
    }
    return config
  },
}

export default config
