<template>
  <SectionContainer id="education" :title="t('sections.education')">
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
        {{ t('actions.showLocation') }}
      </button>
    </article>
  </SectionContainer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionContainer from '@/components/layout/SectionContainer.vue'
import type { EducationItem } from '@/types/cv'

const { t } = useI18n()

defineProps<{
  items: EducationItem[]
}>()

defineEmits<{
  openMapAt: [placeId: string]
}>()
</script>
