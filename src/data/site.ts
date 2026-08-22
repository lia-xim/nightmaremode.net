export const navItems = [
  { label: "Essays", href: "/essays/" },
  { label: "Field Notes", href: "/field-notes/" },
  { label: "Archive", href: "/archive/" },
  { label: "About", href: "/about/" },
] as const;

export const sectionPages = {
  conversations: {
    title: "Conversations",
    intro: "Recorded exchanges with present-day consent, visible editing boundaries, and room for disagreement.",
  },
} as const;
