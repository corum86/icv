<template>
  <ModalBase :open="open" title="Karrierestandorte" @close="$emit('close')">
    <CVMap :markers="markers" :initial-marker-id="focusMarkerId" />
  </ModalBase>
</template>

<script setup lang="ts">
import CVMap from './CVMap.vue'
import ModalBase from '@/components/ui/ModalBase.vue'
import type { PlaceMarker } from '@/types/cv'

defineProps<{
  open: boolean
  markers: PlaceMarker[]
  focusMarkerId?: string
}>()

defineEmits<{
  close: []
}>()
</script>
