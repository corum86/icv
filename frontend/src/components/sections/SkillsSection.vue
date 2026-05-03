<template>
  <SectionContainer id="skills" title="Kompetenzen">
    <SkillConstellation :categories="skills" />
    <div class="grid-two">
      <article v-for="group in skills" :key="group.id" class="card">
        <h3>{{ group.label }}</h3>
        <p>{{ group.skills.join(', ') }}</p>
      </article>
    </div>
    <p>
      Kompetenzbereiche: <AnimatedCounter :value="skills.length" />
    </p>
  </SectionContainer>
</template>

<script setup lang="ts">
import SectionContainer from '@/components/layout/SectionContainer.vue'
import SkillConstellation from '@/components/svg/SkillConstellation.vue'
import AnimatedCounter from '@/components/ui/AnimatedCounter.vue'
import type { SkillCategory } from '@/types/cv'

defineProps<{
  skills: SkillCategory[]
}>()
</script>
