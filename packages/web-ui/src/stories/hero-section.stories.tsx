import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { HeroSection } from "../hero-section"

const meta: Meta<typeof HeroSection> = {
  title: "Web UI/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  args: {
    title: "Documenting Web Features",
    subtitle: "A detailed breakdown of all user interfaces and styles in our template.",
  },
}

export default meta
type Story = StoryObj<typeof HeroSection>

export const Simple: Story = {}

export const WithCta: Story = {
  args: {
    cta: React.createElement(
      "div",
      { className: "flex gap-4" },
      React.createElement(
        "button",
        { className: "h-10 px-6 rounded-md bg-primary text-primary-foreground font-semibold" },
        "Get Started",
      ),
      React.createElement(
        "button",
        { className: "h-10 px-6 rounded-md border font-semibold" },
        "Learn More",
      ),
    ),
  },
}
