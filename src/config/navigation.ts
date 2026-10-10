export interface NavLink {
  id: string;
  code: string;
  label: string;
  /** Primary links appear inline on wide screens; every link is in the menu. */
  primary: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { id: "work", code: "02", label: "Work", primary: true },
  { id: "team", code: "03", label: "Operators", primary: true },
  { id: "process", code: "04", label: "Process", primary: false },
  { id: "services", code: "05", label: "Services", primary: true },
  { id: "proof", code: "06", label: "Clients", primary: false },
  { id: "terminal", code: "07", label: "Terminal", primary: false },
  { id: "stack", code: "08", label: "Stack", primary: false },
  { id: "faq", code: "09", label: "FAQ", primary: false },
  { id: "contact", code: "10", label: "Contact", primary: true },
];

export const NAV_SECTION_IDS = NAV_LINKS.map((link) => link.id);
