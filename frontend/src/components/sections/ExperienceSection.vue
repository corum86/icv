<template>
  <SectionContainer id="experience" :title="t('sections.experience')">
    <ol class="timeline">
      <li v-for="item in items" :key="item.id" class="timeline-item">
        <p class="timeline-date">{{ formatDateRange(item.start, item.end, locale) }}</p>
        <div class="timeline-body">
          <h3 class="timeline-title">{{ item.role }}</h3>
          <p class="timeline-meta">
            <span>{{ item.company }}</span>
            <PlaceLink
              v-if="item.location"
              :label="item.location"
              :place-id="item.placeId"
              @open="$emit('openMapAt', $event)"
            />
          </p>
          <p v-if="item.summary">{{ item.summary }}</p>
          <ul
            v-if="item.highlights.length"
            :id="`${item.id}-highlights`"
            class="highlight-list"
            :class="{ 'is-expanded': expanded.has(item.id) }"
          >
            <li
              v-for="(point, index) in item.highlights"
              :key="point"
              :class="{ 'is-extra': index >= VISIBLE_HIGHLIGHTS }"
            >
              {{ point }}
            </li>
          </ul>
          <button
            v-if="item.highlights.length > VISIBLE_HIGHLIGHTS"
            class="text-button highlight-toggle"
            type="button"
            :aria-expanded="expanded.has(item.id)"
            :aria-controls="`${item.id}-highlights`"
            @click="toggle(item.id)"
          >
            {{
              expanded.has(item.id)
                ? t('actions.showLess')
                : t('actions.showMore', { n: item.highlights.length - VISIBLE_HIGHLIGHTS })
            }}
          </button>
        </div>
      </li>
    </ol>
  </SectionContainer>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import SectionContainer from '@/components/layout/SectionContainer.vue'
import PlaceLink from '@/components/ui/PlaceLink.vue'
import type { ExperienceItem } from '@/types/cv'
import { formatDateRange } from '@/utils/formatDate'

// Extra highlights stay in the DOM (hidden via CSS) so the print stylesheet can show them all.
const VISIBLE_HIGHLIGHTS = 4

const { t, locale } = useI18n()

defineProps<{
  items: ExperienceItem[]
}>()

defineEmits<{
  openMapAt: [placeId: string]
}>()

const expanded = reactive(new Set<string>())

const toggle = (id: string) => {
  if (expanded.has(id)) {
    expanded.delete(id)
  } else {
    expanded.add(id)
  }
}
</script>
