<template>
  <svg viewBox="0 0 640 150" role="img" aria-label="Experience timeline" class="timeline-svg">
    <path d="M 30 70 C 160 10, 320 130, 610 70" stroke="currentColor" stroke-width="2" fill="none" />
    <defs>
      <clipPath v-for="item in orderedItems" :key="`clip-${item.id}`" :id="`timeline-clip-${item.id}`">
        <circle r="15" />
      </clipPath>
    </defs>
    <g
      v-for="(item, index) in orderedItems"
      :key="item.id"
      :transform="`translate(${50 + index * gap}, 70)`"
      tabindex="0"
    >
      <title>{{ item.company }} - {{ item.role }}</title>
      <circle r="16" fill="var(--color-bg-soft)" stroke="var(--color-accent-alt)" stroke-width="2" />
      <image
        :href="milestoneIcons[index]"
        x="-15"
        y="-15"
        width="30"
        height="30"
        preserveAspectRatio="xMidYMid slice"
        :clip-path="`url(#timeline-clip-${item.id})`"
      />
      <text y="32" text-anchor="middle" font-size="11" fill="var(--color-accent-alt)">
        {{ formatMonthYear(item.start, locale) }}
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { ExperienceItem } from '@/types/cv'
import { formatMonthYear } from '@/utils/formatDate'

const props = defineProps<{
  items: ExperienceItem[]
}>()

const { locale } = useI18n()

// Rendered oldest-to-newest (left-to-right), while ExperienceSection's card
// list stays newest-first, so this only reverses the visual timeline order.
const orderedItems = computed(() => [...props.items].reverse())

const milestoneIcons = ['/images/intern.svg', '/images/head.svg', '/images/engineer.svg']

const gap = computed(() => (orderedItems.value.length > 1 ? 540 / (orderedItems.value.length - 1) : 0))
</script>

<style scoped>
.timeline-svg {
  width: 100%;
  color: var(--color-accent);
}
</style>
