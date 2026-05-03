<template>
  <div ref="target" class="reveal" :class="{ 'is-visible': isVisible }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isVisible = ref(false)
const target = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!target.value) {
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.2 },
  )

  observer.observe(target.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>
