<template>
  <SectionContainer id="about" title="Über mich">
    <RevealOnScroll>
      <p>{{ about.title }}</p>
      <p v-for="paragraph in about.paragraphs" :key="paragraph">{{ paragraph }}</p>
    </RevealOnScroll>
  </SectionContainer>
</template>

<script setup lang="ts">
import SectionContainer from '@/components/layout/SectionContainer.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import type { AboutContent } from '@/types/cv'

defineProps<{
  about: AboutContent
}>()
</script>
