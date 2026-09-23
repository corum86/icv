<template>
  <div class="app-shell">
    <TopNav
      :brand="brand"
      :sections="sections"
      :active-section="activeSection"
      :locale="locale"
      @navigate="$emit('navigate', $event)"
      @open-map="$emit('openMap')"
      @locale-change="$emit('localeChange', $event)"
    />
    <div ref="scrollRoot" class="sections-scroll-root">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { AppLocale } from '@/i18n'
import type { SectionId } from '@/types/cv'
import TopNav, { type NavSection } from './TopNav.vue'

defineProps<{
  brand: string
  sections: readonly NavSection[]
  activeSection: SectionId
  locale: AppLocale
}>()

const scrollRoot = ref<HTMLElement | null>(null)

const emit = defineEmits<{
  navigate: [sectionId: SectionId]
  openMap: []
  localeChange: [locale: AppLocale]
  rootMounted: [root: HTMLElement]
}>()

onMounted(() => {
  if (scrollRoot.value) {
    emit('rootMounted', scrollRoot.value)
  }
})

defineExpose({
  scrollRoot,
})
</script>
