<template>
  <main>
    <div v-if="loading" class="loading-state">
      <div class="loading-gif-stage" :class="{ 'show-second': useSecondGif }">
        <img :src="firstLoadingGif" alt="Loading animation" class="loading-gif loading-gif-first" />
        <img :src="secondLoadingGif" alt="" aria-hidden="true" class="loading-gif loading-gif-second" />
      </div>
      <p>Server wird gestartet, bitte kurz warten...</p>
    </div>

    <template v-else>
      <p v-if="error" class="error-banner">Profil-Endpunkt aktuell nicht erreichbar: {{ error }}</p>
      <AppShell
        :sections="navSections"
        :active-section="activeSection"
        :relaxed-snap="relaxedSnap"
        @navigate="handleNavigate"
        @open-map="openMap"
        @root-mounted="setScrollRoot"
      >
        <HeroSection
          :hero="cvContent.hero"
          :profile-name="profile?.name"
          :profile-title="profile?.title"
          @open-map="openMap"
          @jump-to-projects="handleNavigate('projects')"
        />
        <AboutSection :about="cvContent.about" />
        <ExperienceSection :items="cvContent.experience" @open-map-at="openMapAt" />
        <ProjectsSection :projects="cvContent.projects" @open-map-at="openMapAt" />
        <SkillsSection :skills="cvContent.skills" />
        <EducationSection :items="cvContent.education" @open-map-at="openMapAt" />
        <ContactSection :contact="cvContent.contact" />
      </AppShell>

      <component
        :is="CVMapModalAsync"
        :open="mapOpen"
        :markers="markers"
        :focus-marker-id="focusedMarkerId"
        @close="mapOpen = false"
      />
    </template>
  </main>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

import { AppShell } from '@/components/layout'
import {
  AboutSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
} from '@/components/sections'
import { useActiveSection, useProfileBootstrap, useSnapScroll } from '@/composables'
import { staticCvContentService } from '@/services'
import { cvData } from '@/data/cvData'
import { places } from '@/data/places'
import type { CVContent, PlaceMarker, SectionId } from '@/types/cv'

const sectionIds: SectionId[] = [
  'hero',
  'about',
  'experience',
  'projects',
  'skills',
  'education',
  'contact',
]

const navSections = [
  { id: 'hero', label: 'Profil' },
  { id: 'about', label: 'Über mich' },
  { id: 'experience', label: 'Erfahrung' },
  { id: 'projects', label: 'Projekte' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Ausbildung' },
  { id: 'contact', label: 'Kontakt' },
] as const

const { profile, loading, error, firstLoadingGif, secondLoadingGif, useSecondGif } = useProfileBootstrap()
const cvContent = ref<CVContent>(cvData)
const markers = ref<PlaceMarker[]>(places)
const mapOpen = ref(false)
const focusedMarkerId = ref<string | undefined>(undefined)
const scrollRootRef = ref<HTMLElement | null>(null)
const isReducedMotion = ref(false)

const { activeSection, setActive } = useActiveSection(sectionIds, scrollRootRef)
const { isStrictSnap, scrollToSection } = useSnapScroll({
  sectionIds,
  rootRef: scrollRootRef,
  isReducedMotion,
})

const relaxedSnap = computed(() => !isStrictSnap.value)

const CVMapModalAsync = defineAsyncComponent(() => import('@/components/map/CVMapModal.vue'))

const setScrollRoot = (root: HTMLElement) => {
  scrollRootRef.value = root
}

const handleNavigate = (sectionId: SectionId) => {
  const index = sectionIds.findIndex((id) => id === sectionId)
  if (index >= 0) {
    scrollToSection(index)
    setActive(sectionId)
  }
}

const openMap = () => {
  mapOpen.value = true
}

const openMapAt = (placeId: string) => {
  focusedMarkerId.value = placeId
  mapOpen.value = true
}

onMounted(async () => {
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  isReducedMotion.value = reducedMotionQuery.matches

  cvContent.value = await staticCvContentService.getCvContent()
  markers.value = await staticCvContentService.getPlaceMarkers()

  const hashTarget = window.location.hash.replace('#', '') as SectionId
  if (hashTarget) {
    handleNavigate(hashTarget)
  }
})
</script>

<style scoped>
.loading-state {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.loading-gif-stage {
  display: grid;
  width: 180px;
  max-width: 100%;
}

.loading-gif {
  grid-area: 1 / 1;
  width: 100%;
  height: auto;
  transition: opacity 120ms linear;
}

.loading-gif-first {
  opacity: 1;
}

.loading-gif-second {
  opacity: 0;
}

.loading-gif-stage.show-second .loading-gif-first {
  opacity: 0;
}

.loading-gif-stage.show-second .loading-gif-second {
  opacity: 1;
}

.error-banner {
  margin: 78px auto 0;
  width: min(980px, calc(100% - 32px));
  border: 1px solid var(--color-danger);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  background: rgba(255, 122, 122, 0.16);
}
</style>