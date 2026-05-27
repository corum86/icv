<template>
  <SectionContainer id="projects" :title="t('sections.projects')">
    <ProjectConnector :projects="projects" />
    <div class="grid-two projects-grid">
      <article v-for="project in projects" :key="project.id" class="card">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <p>{{ project.technologies.join(' / ') }}</p>
        <div>
          <a v-if="project.link" :href="project.link" target="_blank" rel="noreferrer">{{
            t('actions.projectLink')
          }}</a>
          <button
            v-if="project.placeId"
            class="inline-action"
            type="button"
            @click="$emit('openMapAt', project.placeId)"
          >
            {{ t('actions.location') }}
          </button>
        </div>
      </article>
    </div>
    <div class="card projects-grid">
      <previewbox-article
        url="https://paidopsy-trikala.gr/"
        title="Webpage for a psychiatric practice in Greece."
        description="Psychiatry and psychotherapy for children and adolescents. Together we can find solutions and discover new perspectives for the future."
        imageUrl="https://doctor-online.gr/wp-content/uploads/2020/09/12666.jpg"
        imageAlt="Practice facade with sign 'Paidopsy Trikala' and a tree in front."
        author="Sergkei Kournosenkov"
        target="_blank"
        rel="nofollow"
        :readMoreBtnText="t('actions.openPage')"
      />
    </div>
  </SectionContainer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionContainer from '@/components/layout/SectionContainer.vue'
import ProjectConnector from '@/components/svg/ProjectConnector.vue'
import type { ProjectItem } from '@/types/cv'

const { t } = useI18n()

defineProps<{
  projects: ProjectItem[]
}>()

defineEmits<{
  openMapAt: [placeId: string]
}>()
</script>

<style scoped>
.projects-grid {
  row-gap: 24px;
  column-gap: 24px;
  margin-bottom: 24px;
}
</style>
