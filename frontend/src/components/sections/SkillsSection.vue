<template>
  <SectionContainer id="skills" :title="t('sections.skills')">
    <SkillConstellation :categories="skills" />
    <div class="grid-two">
      <article v-for="group in skills" :key="group.id" class="card">
        <h3>{{ group.label }}</h3>
        <p>{{ group.skills.join(', ') }}</p>
      </article>
    </div>
    <p>{{ t('labels.skillAreas') }}: <AnimatedCounter :value="skills.length" /></p>
  </SectionContainer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionContainer from '@/components/layout/SectionContainer.vue'
import SkillConstellation from '@/components/svg/SkillConstellation.vue'
import AnimatedCounter from '@/components/ui/AnimatedCounter.vue'
import type { SkillCategory } from '@/types/cv'

const { t } = useI18n()

defineProps<{
  skills: SkillCategory[]
}>()
</script>
