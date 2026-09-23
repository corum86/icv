<template>
  <main>
    <div v-if="loading" class="loading-state">
      <div class="loading-gif-stage" :class="{ 'show-second': useSecondGif }">
        <img :src="firstLoadingGif" alt="Loading animation" class="loading-gif loading-gif-first" />
        <img
          :src="secondLoadingGif"
          alt=""
          aria-hidden="true"
          class="loading-gif loading-gif-second"
        />
      </div>
      <p>{{ t('status.serverStarting') }}</p>
    </div>

    <template v-else>
      <Analytics />

      <p v-if="error" class="error-banner">
        {{ t('status.profileEndpointUnavailable') }}: {{ error }}
      </p>
      <AppShell
        :brand="cvContent.hero.name"
        :sections="navSections"
        :active-section="activeSection"
        :locale="locale"
        @navigate="handleNavigate"
        @open-map="openMap"
        @locale-change="handleLocaleChange"
        @root-mounted="setScrollRoot"
      >
        <HeroSection
          :hero="cvContent.hero"
          :contact="cvContent.contact"
          :languages="cvContent.languages"
          :current-position="currentPosition"
          :profile-name="profile?.name"
          :profile-title="profile?.title"
        />
        <ExperienceSection :items="cvContent.experience" @open-map-at="openMapAt" />
        <ProjectsSection :projects="cvContent.projects" />
        <SkillsSection :skills="cvContent.skills" />
        <EducationSection :items="cvContent.education" @open-map-at="openMapAt" />
        <footer class="cv-footer">
          © {{ currentYear }} {{ cvContent.hero.name }} ·
          <a :href="`mailto:${cvContent.contact.email}`">{{ cvContent.contact.email }}</a>
        </footer>
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
import { computed, defineAsyncComponent, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { AppShell } from '@/components/layout'
import {
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
} from '@/components/sections'
import type { NavSection } from '@/components/layout/TopNav.vue'
import { useActiveSection, useProfileBootstrap } from '@/composables'
import { cvContentService } from '@/services'
import { cvDataByLocale } from '@/data/cvData'
import { places } from '@/data/places'
import { getCurrentLocale, setLocale, type AppLocale } from '@/i18n'
import type { CVContent, PlaceMarker, SectionId } from '@/types/cv'
import { isOngoing } from '@/utils/formatDate'
import { Analytics } from '@vercel/analytics/vue'

const sectionIds: SectionId[] = ['hero', 'experience', 'projects', 'skills', 'education']

const { t } = useI18n()
const locale = ref<AppLocale>(getCurrentLocale())

// The header itself is reached via the brand button, so it has no nav link.
const navSections = computed<NavSection[]>(() =>
  sectionIds.filter((id) => id !== 'hero').map((id) => ({ id, label: t(`nav.sections.${id}`) })),
)

const { profile, loading, error, firstLoadingGif, secondLoadingGif, useSecondGif } =
  useProfileBootstrap()
const cvContent = ref<CVContent>(cvDataByLocale[locale.value])
const currentPosition = computed(() =>
  cvContent.value.experience.find((item) => isOngoing(item.end)),
)
const currentYear = new Date().getFullYear()
const markers = ref<PlaceMarker[]>(places)
const mapOpen = ref(false)
const focusedMarkerId = ref<string | undefined>(undefined)
const scrollRootRef = ref<HTMLElement | null>(null)
const isReducedMotion = ref(false)

const { activeSection, setActive } = useActiveSection(sectionIds, scrollRootRef)

const CVMapModalAsync = defineAsyncComponent(() => import('@/components/map/CVMapModal.vue'))

const setScrollRoot = (root: HTMLElement) => {
  scrollRootRef.value = root
}

const handleNavigate = (sectionId: SectionId) => {
  const root = scrollRootRef.value
  const section = root?.querySelector<HTMLElement>(`#${sectionId}`)
  section?.scrollIntoView({ behavior: isReducedMotion.value ? 'auto' : 'smooth', block: 'start' })
  setActive(sectionId)
}

const openMap = () => {
  mapOpen.value = true
}

const openMapAt = (placeId: string) => {
  focusedMarkerId.value = placeId
  mapOpen.value = true
}

const loadCvContent = async () => {
  cvContent.value = await cvContentService.getCvContent(locale.value)
}

const handleLocaleChange = (nextLocale: AppLocale) => {
  if (nextLocale === locale.value) {
    return
  }

  locale.value = nextLocale
  setLocale(nextLocale)
}

onMounted(async () => {
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  isReducedMotion.value = reducedMotionQuery.matches

  await loadCvContent()
  markers.value = await cvContentService.getPlaceMarkers()
})

watch(locale, async () => {
  await loadCvContent()
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
