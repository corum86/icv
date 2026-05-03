<template>
  <svg viewBox="0 0 400 240" class="constellation" role="img" aria-label="Skill constellation">
    <line
      v-for="line in lines"
      :key="`line-${line.x1}-${line.y1}-${line.x2}-${line.y2}`"
      :x1="line.x1"
      :y1="line.y1"
      :x2="line.x2"
      :y2="line.y2"
      stroke="rgba(70, 208, 201, 0.5)"
      stroke-width="1.2"
    />
    <g v-for="node in nodes" :key="node.label" :transform="`translate(${node.x}, ${node.y})`">
      <circle r="10" fill="var(--color-surface-strong)" stroke="var(--color-accent-alt)" tabindex="0">
        <title>{{ node.label }}</title>
      </circle>
      <text y="24" text-anchor="middle" font-size="11">{{ node.label }}</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { SkillCategory } from '@/types/cv'

const props = defineProps<{
  categories: SkillCategory[]
}>()

const nodes = computed(() =>
  props.categories.map((category, index) => ({
    label: category.label,
    x: 70 + index * 120,
    y: index % 2 === 0 ? 90 : 150,
  })),
)

const lines = computed(() => {
  const pairs: Array<{ x1: number; y1: number; x2: number; y2: number }> = []
  for (let index = 0; index < nodes.value.length - 1; index += 1) {
    const current = nodes.value[index]
    const next = nodes.value[index + 1]
    if (!current || !next) {
      continue
    }

    pairs.push({ x1: current.x, y1: current.y, x2: next.x, y2: next.y })
  }
  return pairs
})
</script>

<style scoped>
.constellation {
  width: 100%;
}
</style>
