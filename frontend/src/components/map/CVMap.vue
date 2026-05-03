<template>
  <LMap class="cv-map" :zoom="zoom" :center="center" :use-global-leaflet="false">
    <LTileLayer :url="tileUrl" :attribution="attribution" />
    <LMarker v-for="marker in markers" :key="marker.id" :lat-lng="[marker.lat, marker.lng]">
      <LPopup>
        <article>
          <h4>{{ marker.title }}</h4>
          <p>{{ marker.role }}</p>
          <p>{{ marker.dateRange }}</p>
          <p>{{ marker.summary }}</p>
          <a v-if="marker.link" :href="marker.link" target="_blank" rel="noreferrer">Mehr erfahren</a>
        </article>
      </LPopup>
    </LMarker>
  </LMap>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LMap, LMarker, LPopup, LTileLayer } from '@vue-leaflet/vue-leaflet'

import type { PlaceMarker } from '@/types/cv'

const props = defineProps<{
  markers: PlaceMarker[]
  initialMarkerId?: string
}>()

const zoom = 4
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; OpenStreetMap contributors'

const center = computed<[number, number]>(() => {
  const preferred = props.markers.find((marker) => marker.id === props.initialMarkerId)
  if (preferred) {
    return [preferred.lat, preferred.lng]
  }

  const first = props.markers[0]
  return first ? [first.lat, first.lng] : [44.4268, 26.1025]
})
</script>

<style scoped>
.cv-map {
  width: 100%;
  height: 100%;
}
</style>
