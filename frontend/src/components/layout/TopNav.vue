<template>
  <header class="top-nav">
    <div class="top-nav-inner">
      <nav class="top-nav-links" :aria-label="t('nav.ariaLabel')">
        <button
          v-for="section in sections"
          :key="section.id"
          class="nav-link"
          :class="{ 'is-active': section.id === activeSection }"
          type="button"
          @click="$emit('navigate', section.id)"
        >
          {{ section.label }}
        </button>
      </nav>
      <div class="top-nav-actions">
        <div class="locale-switch" role="group" :aria-label="t('nav.ariaLabel')">
          <button
            v-for="option in localeOptions"
            :key="option"
            class="locale-button"
            :class="{ 'is-active': locale === option }"
            type="button"
            @click="$emit('localeChange', option)"
          >
            {{ t(`nav.locale.${option}`) }}
          </button>
        </div>
        <button class="nav-cta" type="button" @click="$emit('openMap')">
          {{ t('nav.openMap') }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { SUPPORTED_LOCALES, type AppLocale } from '@/i18n'
import type { SectionId } from '@/types/cv'

export interface NavSection {
  id: SectionId
  label: string
}

const localeOptions = SUPPORTED_LOCALES
const { t } = useI18n()

defineProps<{
  sections: readonly NavSection[]
  activeSection: SectionId
  locale: AppLocale
}>()

defineEmits<{
  navigate: [sectionId: SectionId]
  openMap: []
  localeChange: [locale: AppLocale]
}>()
</script>
