export interface NavLink {
  id: string;
  label: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { id: "team", label: "Operators" },
  { id: "terminal", label: "Terminal" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Uplink" },
];

export const NAV_SECTION_IDS = NAV_LINKS.map((link) => link.id);
