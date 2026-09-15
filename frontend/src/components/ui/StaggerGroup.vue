<template>
  <div
    ref="host"
    class="stagger"
    :class="{ 'is-visible': isVisible }"
    :style="stepMs !== undefined ? { '--motion-stagger-step': `${stepMs}ms` } : undefined"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const { stepMs } = defineProps<{
  stepMs?: number
}>()

const host = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!host.value) {
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -15% 0px' },
  )

  observer.observe(host.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>
