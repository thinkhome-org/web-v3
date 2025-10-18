export type NavLink = { href: string; label: string }

export const MAIN_NAV_LINKS: NavLink[] = [
  { href: "/", label: "Domů" },
  { href: "/o-nas", label: "O nás" },
  { href: "/nas-tym", label: "Náš tým" },
  { href: "/sluzby", label: "Služby" },
]

export type HeroCta = { id: string; label: string }

export const HERO_CTAS: HeroCta[] = [
  { id: "contact", label: "Kontaktujte nás" },
  { id: "services", label: "Naše služby" },
]

