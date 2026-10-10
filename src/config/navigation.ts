export interface NavLink {
  id: string;
  code: string;
  label: string;
  /** Primary links appear inline on wide screens; every link is in the menu. */
  primary: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { id: "work", code: "02", label: "Work", primary: true },
  { id: "proof", code: "03", label: "Credentials", primary: false },
  { id: "team", code: "04", label: "Team", primary: true },
  { id: "services", code: "05", label: "Services", primary: true },
  { id: "stack", code: "06", label: "Stack", primary: false },
  { id: "faq", code: "07", label: "FAQ", primary: false },
  { id: "contact", code: "08", label: "Contact", primary: true },
];

export const NAV_SECTION_IDS = NAV_LINKS.map((link) => link.id);
