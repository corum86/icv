<template>
  <SectionContainer id="skills" :title="t('sections.skills')">
    <dl class="skill-groups">
      <div v-for="group in skills" :key="group.id" class="skill-group">
        <dt>{{ group.label }}</dt>
        <dd>
          <ul class="chip-list">
            <li v-for="skill in group.skills" :key="skill" class="chip">{{ skill }}</li>
          </ul>
        </dd>
      </div>
    </dl>
  </SectionContainer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionContainer from '@/components/layout/SectionContainer.vue'
import type { SkillCategory } from '@/types/cv'

const { t } = useI18n()

defineProps<{
  skills: SkillCategory[]
}>()
</script>

<style scoped>
.skill-groups {
  display: grid;
  gap: 16px;
  margin: 0;
}

.skill-group {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 6px 24px;
  align-items: baseline;
}

.skill-group dt {
  font-size: 0.875rem;
  font-weight: 600;
}

.skill-group dd {
  margin: 0;
}

@media (max-width: 720px) {
  .skill-group {
    grid-template-columns: 1fr;
  }
}
</style>
