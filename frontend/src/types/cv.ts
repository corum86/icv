export type SectionId =
  | 'hero'
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'locations'
  | 'contact'

export interface HeroContent {
  name: string
  role: string
  tagline: string
  summary: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
}

export interface AboutContent {
  title: string
  paragraphs: string[]
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  start: string
  end: string
  summary: string
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
  end: string
  details: string
  placeId?: string
}

export interface ContactContent {
  email: string
  phone?: string
  website?: string
  location: string
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
  about: AboutContent
  experience: ExperienceItem[]
  projects: ProjectItem[]
  skills: SkillCategory[]
  education: EducationItem[]
  contact: ContactContent
}
