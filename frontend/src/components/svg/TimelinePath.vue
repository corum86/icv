<template>
  <svg viewBox="0 0 640 140" role="img" aria-label="Experience timeline" class="timeline-svg">
    <path d="M 30 70 C 160 10, 320 130, 610 70" stroke="currentColor" stroke-width="2" fill="none" />
    <g v-for="(item, index) in items" :key="item.id" :transform="`translate(${50 + index * gap}, 70)`">
      <circle r="7" fill="var(--color-accent-alt)" tabindex="0">
        <title>{{ item.company }} - {{ item.role }}</title>
      </circle>
      <text y="24" text-anchor="middle" font-size="11">{{ item.start }}</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { ExperienceItem } from '@/types/cv'

const props = defineProps<{
  items: ExperienceItem[]
}>()

const gap = computed(() => (props.items.length > 1 ? 540 / (props.items.length - 1) : 0))
</script>

<style scoped>
.timeline-svg {
  width: 100%;
  color: var(--color-accent);
}
</style>
