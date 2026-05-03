<template>
  <header class="top-nav">
    <div class="top-nav-inner">
      <nav class="top-nav-links" aria-label="Hauptnavigation">
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
      <button class="nav-cta" type="button" @click="$emit('openMap')">Karte öffnen</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { SectionId } from '@/types/cv'

export interface NavSection {
  id: SectionId
  label: string
}

defineProps<{
  sections: readonly NavSection[]
  activeSection: SectionId
}>()

defineEmits<{
  navigate: [sectionId: SectionId]
  openMap: []
}>()
</script>
