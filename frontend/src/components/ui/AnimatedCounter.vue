<template>
  <span ref="host">{{ displayValue }}</span>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    value: number
    durationMs?: number
  }>(),
  {
    durationMs: 900,
  },
)

const host = ref<HTMLElement | null>(null)
const displayValue = ref(0)
let observer: IntersectionObserver | null = null

const animate = () => {
  const start = performance.now()

  const tick = (time: number) => {
    const progress = Math.min(1, (time - start) / props.durationMs)
    displayValue.value = Math.round(progress * props.value)

    if (progress < 1) {
      requestAnimationFrame(tick)
    }
  }

  requestAnimationFrame(tick)
}

onMounted(() => {
  if (!host.value) {
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animate()
        observer?.disconnect()
      }
    },
    { threshold: 0.4 },
  )

  observer.observe(host.value)
})

watch(
  () => props.value,
  () => {
    displayValue.value = 0
    animate()
  },
)

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>
