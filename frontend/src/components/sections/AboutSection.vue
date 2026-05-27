<template>
  <SectionContainer id="about" :title="t('sections.about')">
    <RevealOnScroll>
      <p>{{ about.title }}</p>
      <p v-for="paragraph in about.paragraphs" :key="paragraph">{{ paragraph }}</p>
    </RevealOnScroll>
  </SectionContainer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionContainer from '@/components/layout/SectionContainer.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import type { AboutContent } from '@/types/cv'

const { t } = useI18n()

defineProps<{
  about: AboutContent
}>()
</script>
