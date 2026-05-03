<template>
  <SectionContainer id="education" title="Ausbildung">
    <article v-for="item in items" :key="item.id" class="card">
      <h3>{{ item.program }}</h3>
      <p>{{ item.institution }}</p>
      <p>{{ item.start }} - {{ item.end }}</p>
      <p>{{ item.details }}</p>
      <button
        v-if="item.placeId"
        class="inline-action"
        type="button"
        @click="$emit('openMapAt', item.placeId)"
      >
        Ort anzeigen
      </button>
    </article>
  </SectionContainer>
</template>

<script setup lang="ts">
import SectionContainer from '@/components/layout/SectionContainer.vue'
import type { EducationItem } from '@/types/cv'

defineProps<{
  items: EducationItem[]
}>()

defineEmits<{
  openMapAt: [placeId: string]
}>()
</script>
