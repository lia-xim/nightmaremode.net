export const navItems = [
  { label: "Essays", href: "/essays/" },
  { label: "Field Notes", href: "/field-notes/" },
  { label: "Conversations", href: "/conversations/" },
  { label: "Archive", href: "/archive/" },
  { label: "About", href: "/about/" },
] as const;

export const sectionPages = {
  "field-notes": {
    title: "Field Notes",
    intro: "Evidence from play: annotated mechanics, captured observations, build details, and interpretations that can change.",
  },
  conversations: {
    title: "Conversations",
    intro: "Recorded exchanges with present-day consent, visible editing boundaries, and room for disagreement.",
  },
} as const;
