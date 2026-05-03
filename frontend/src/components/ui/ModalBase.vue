<template>
  <Teleport to="body">
    <div v-if="open" class="modal-overlay" @mousedown.self="emitClose">
      <div
        ref="modalRef"
        class="modal-content"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        @keydown="onKeyDown"
      >
        <header class="modal-header">
          <strong>{{ title }}</strong>
          <button class="secondary-button" type="button" @click="emitClose">Close</button>
        </header>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()

const modalRef = ref<HTMLElement | null>(null)

const getFocusable = () => {
  if (!modalRef.value) {
    return []
  }

  return Array.from(
    modalRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  )
}

const trapTab = (event: KeyboardEvent) => {
  const focusable = getFocusable()
  if (focusable.length === 0) {
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (!first || !last) {
    return
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  }

  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    emitClose()
  }

  if (event.key === 'Tab') {
    trapTab(event)
  }
}

const emitClose = () => emit('close')

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      await nextTick()
      getFocusable()[0]?.focus()
    }
  },
)
</script>
