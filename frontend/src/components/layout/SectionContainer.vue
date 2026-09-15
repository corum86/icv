<template>
  <section :id="id" class="section-wrap" :aria-label="title">
    <article class="section-card" :class="{ 'section-card--plain': plain }">
      <h2 v-if="!plain" class="section-title">{{ title }}</h2>
      <slot />
    </article>
  </section>
</template>

<script setup lang="ts">
import type { SectionId } from '@/types/cv'

withDefaults(
  defineProps<{
    id: SectionId
    title: string
    plain?: boolean
  }>(),
  {
    plain: false,
  },
)
</script>
