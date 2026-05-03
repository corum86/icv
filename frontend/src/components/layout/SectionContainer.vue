<template>
  <section :id="id" class="section-wrap" :aria-label="title">
    <article class="section-card">
      <h2 class="section-title">{{ title }}</h2>
      <slot />
    </article>
  </section>
</template>

<script setup lang="ts">
import type { SectionId } from '@/types/cv'

defineProps<{
  id: SectionId
  title: string
}>()
</script>
