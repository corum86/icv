<template>
  <SectionContainer id="projects" title="Projekte">
    <ProjectConnector :projects="projects" />
    <div class="grid-two">
      <article v-for="project in projects" :key="project.id" class="card">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <p>{{ project.technologies.join(' / ') }}</p>
        <div>
          <a v-if="project.link" :href="project.link" target="_blank" rel="noreferrer">Projektlink</a>
          <button
            v-if="project.placeId"
            class="inline-action"
            type="button"
            @click="$emit('openMapAt', project.placeId)"
          >
            Ort
          </button>
        </div>
      </article>
    </div>
  </SectionContainer>
</template>

<script setup lang="ts">
import SectionContainer from '@/components/layout/SectionContainer.vue'
import ProjectConnector from '@/components/svg/ProjectConnector.vue'
import type { ProjectItem } from '@/types/cv'

defineProps<{
  projects: ProjectItem[]
}>()

defineEmits<{
  openMapAt: [placeId: string]
}>()
</script>
