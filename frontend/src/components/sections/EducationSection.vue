<template>
  <SectionContainer id="education" :title="t('sections.education')">
    <ol class="timeline">
      <li v-for="item in items" :key="item.id" class="timeline-item">
        <p class="timeline-date">{{ formatDateRange(item.start, item.end, locale) }}</p>
        <div class="timeline-body">
          <h3 class="timeline-title">{{ item.program }}</h3>
          <p class="timeline-meta">
            <span>{{ item.institution }}</span>
            <PlaceLink
              v-if="item.location"
              :label="item.location"
              :place-id="item.placeId"
              @open="$emit('openMapAt', $event)"
            />
          </p>
          <p v-if="item.details">{{ item.details }}</p>
        </div>
      </li>
    </ol>
  </SectionContainer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionContainer from '@/components/layout/SectionContainer.vue'
import PlaceLink from '@/components/ui/PlaceLink.vue'
import type { EducationItem } from '@/types/cv'
import { formatDateRange } from '@/utils/formatDate'

const { t, locale } = useI18n()

defineProps<{
  items: EducationItem[]
}>()

defineEmits<{
  openMapAt: [placeId: string]
}>()
</script>
