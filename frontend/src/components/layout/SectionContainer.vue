<template>
  <section :id="id" class="cv-section" :aria-labelledby="`${id}-title`">
    <h2 :id="`${id}-title`" class="cv-section-title">{{ title }}</h2>
    <slot />
  </section>
</template>

<script setup lang="ts">
import type { SectionId } from '@/types/cv'

defineProps<{
  id: SectionId
  title: string
}>()
</script>
