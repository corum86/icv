export type SectionId = 'hero' | 'experience' | 'projects' | 'skills' | 'education'

// Fields added with the one-page header layout are optional so documents that
// were seeded before it (no location/keySkills/languages) still render.
export interface HeroContent {
  name: string
  role: string
  summary: string
  location?: string
  /** "mm.yyyy" start of the professional career, used for the years-of-experience fact. */
  careerStart?: string
  keySkills?: string[]
}

export interface LanguageSkill {
  language: string
  level: string
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  start: string
  end: string
  location?: string
  summary?: string
  highlights: string[]
  placeId?: string
}

export interface ProjectItem {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  placeId?: string
}

export interface SkillCategory {
  id: string
  label: string
  skills: string[]
}

export interface EducationItem {
  id: string
  institution: string
  program: string
  start: string
  end?: string
  location?: string
  details?: string
  placeId?: string
}

export interface ContactContent {
  email: string
  phone?: string
  website?: string
  links: Array<{
    label: string
    href: string
  }>
}

export interface PlaceMarker {
  id: string
  title: string
  role: string
  dateRange: string
  summary: string
  lat: number
  lng: number
  link?: string
  mediaUrl?: string
}

export interface CVContent {
  hero: HeroContent
  experience: ExperienceItem[]
  projects: ProjectItem[]
  skills: SkillCategory[]
  education: EducationItem[]
  languages?: LanguageSkill[]
  contact: ContactContent
}
