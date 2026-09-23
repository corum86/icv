<template>
  <SectionContainer id="projects" :title="t('sections.projects')">
    <div class="card-grid">
      <article v-for="project in projects" :key="project.id" class="card">
        <h3 class="project-name">{{ project.name }}</h3>
        <p class="project-description">{{ project.description }}</p>
        <ul v-if="project.technologies.length" class="chip-list">
          <li v-for="tech in project.technologies" :key="tech" class="chip">{{ tech }}</li>
        </ul>
        <a
          v-if="project.link"
          class="project-link"
          :href="project.link"
          target="_blank"
          rel="noreferrer"
        >
          {{ t('actions.openPage') }} <AppIcon name="external" />
        </a>
      </article>
    </div>
  </SectionContainer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionContainer from '@/components/layout/SectionContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import type { ProjectItem } from '@/types/cv'

const { t } = useI18n()

defineProps<{
  projects: ProjectItem[]
}>()
</script>

<style scoped>
.project-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.project-description {
  flex: 1;
  margin: 0;
  font-size: 0.925rem;
  color: var(--color-text-muted);
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.project-link .app-icon {
  width: 13px;
  height: 13px;
}
</style>
