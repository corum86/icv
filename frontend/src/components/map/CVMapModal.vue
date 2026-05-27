<template>
  <ModalBase :open="open" :title="t('map.careerLocations')" @close="$emit('close')">
    <CVMap :markers="markers" :initial-marker-id="focusMarkerId" />
  </ModalBase>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import CVMap from './CVMap.vue'
import ModalBase from '@/components/ui/ModalBase.vue'
import type { PlaceMarker } from '@/types/cv'

const { t } = useI18n()

defineProps<{
  open: boolean
  markers: PlaceMarker[]
  focusMarkerId?: string
}>()

defineEmits<{
  close: []
}>()
</script>
