<template>
  <SectionContainer id="experience" title="Berufserfahrung">
    <TimelinePath :items="items" />
    <StaggerGroup>
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="card"
        :style="{ '--stagger-index': index }"
      >
        <h3>{{ item.role }} - {{ item.company }}</h3>
        <p>{{ item.start }} bis {{ item.end }}</p>
        <p>{{ item.summary }}</p>
        <ul>
          <li v-for="point in item.highlights" :key="point">{{ point }}</li>
        </ul>
        <button
          v-if="item.placeId"
          class="inline-action"
          type="button"
          @click="$emit('openMapAt', item.placeId)"
        >
          Auf Karte anzeigen
        </button>
      </div>
    </StaggerGroup>
  </SectionContainer>
</template>

<script setup lang="ts">
import SectionContainer from '@/components/layout/SectionContainer.vue'
import TimelinePath from '@/components/svg/TimelinePath.vue'
import StaggerGroup from '@/components/ui/StaggerGroup.vue'
import type { ExperienceItem } from '@/types/cv'

defineProps<{
  items: ExperienceItem[]
}>()

defineEmits<{
  openMapAt: [placeId: string]
}>()
</script>
