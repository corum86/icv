<template>
  <svg viewBox="0 0 640 120" class="project-connector" role="img" aria-label="Project links">
    <path
      v-for="(project, index) in projects"
      :key="project.id"
      :d="`M 20 ${20 + index * 24} C 220 ${40 + index * 18}, 420 ${4 + index * 20}, 620 ${20 + index * 24}`"
      fill="none"
      stroke="rgba(244, 185, 66, 0.6)"
      stroke-width="2"
    />
  </svg>
</template>

<script setup lang="ts">
import type { ProjectItem } from '@/types/cv'

defineProps<{
  projects: ProjectItem[]
}>()
</script>

<style scoped>
.project-connector {
  width: 100%;
  margin-top: 8px;
}
</style>
