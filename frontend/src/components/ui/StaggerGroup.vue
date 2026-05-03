<template>
  <div class="stagger" :style="{ '--motion-stagger-step': `${props.stepMs}ms` }">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    stepMs?: number
  }>(),
  {
    stepMs: 70,
  },
)
</script>
