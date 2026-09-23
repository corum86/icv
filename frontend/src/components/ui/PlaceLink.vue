<template>
  <button
    v-if="placeId"
    class="place-link"
    type="button"
    :title="t('actions.showOnMap')"
    @click="$emit('open', placeId)"
  >
    <AppIcon name="pin" />{{ label }}
  </button>
  <span v-else class="place-link place-link--static"><AppIcon name="pin" />{{ label }}</span>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppIcon from './AppIcon.vue'

const { t } = useI18n()

defineProps<{
  label: string
  placeId?: string
}>()

defineEmits<{
  open: [placeId: string]
}>()
</script>

<style scoped>
.place-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 0;
  background: none;
  padding: 0;
  font: inherit;
  font-size: 0.875rem;
  color: var(--color-text-subtle);
}

.place-link .app-icon {
  width: 13px;
  height: 13px;
}

button.place-link {
  cursor: pointer;
}

button.place-link:hover {
  color: var(--color-accent);
}
</style>
