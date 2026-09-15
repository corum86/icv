import { computed, onBeforeUnmount, onMounted, type Ref } from 'vue'

import type { SectionId } from '@/types/cv'

interface SnapScrollOptions {
  sectionIds: SectionId[]
  rootRef: Ref<HTMLElement | null>
  isReducedMotion: Ref<boolean>
}

const SNAP_DURATION_MS = 1100
const WHEEL_COOLDOWN_MS = SNAP_DURATION_MS + 50
const WHEEL_SENSITIVITY = 24

// The 80px gap above each card is handled by .section-wrap's own top padding
// (see layout.css) so it holds under CSS scroll-snap instead of being fought by it.
const SECTION_TOP_OFFSET_PX = 0

const easeInOutQuint = (t: number) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2)

export function useSnapScroll({ sectionIds, rootRef, isReducedMotion }: SnapScrollOptions) {
  const isMobile = computed(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false
    }

    return window.matchMedia('(max-width: 900px)').matches
  })
  const isStrictSnap = computed(() => !isMobile.value && !isReducedMotion.value)
  let wheelLocked = false
  let scrollAnimationFrame: number | null = null

  const getCurrentIndex = () => {
    const hash = window.location.hash.replace('#', '') as SectionId
    const hashIndex = sectionIds.findIndex((id) => id === hash)
    if (hashIndex >= 0) {
      return hashIndex
    }

    const root = rootRef.value
    if (!root) {
      return 0
    }

    const rootTop = root.getBoundingClientRect().top
    const distances = sectionIds.map((id, index) => {
      const section = root.querySelector<HTMLElement>(`#${id}`)
      if (!section) {
        return { index, distance: Number.POSITIVE_INFINITY }
      }

      const delta = Math.abs(section.getBoundingClientRect().top - rootTop)
      return { index, distance: delta }
    })

    const nearest = distances.sort((left, right) => left.distance - right.distance)[0]
    return nearest?.index ?? 0
  }

  const scrollToSection = (index: number) => {
    const root = rootRef.value
    if (!root) {
      return
    }

    const bounded = Math.max(0, Math.min(sectionIds.length - 1, index))
    const id = sectionIds[bounded]
    const section = root.querySelector<HTMLElement>(`#${id}`)
    if (!section) {
      return
    }

    const delta = section.getBoundingClientRect().top - root.getBoundingClientRect().top
    const maxScrollTop = root.scrollHeight - root.clientHeight
    const targetScrollTop = Math.max(
      0,
      Math.min(maxScrollTop, root.scrollTop + delta - SECTION_TOP_OFFSET_PX),
    )

    if (scrollAnimationFrame !== null) {
      cancelAnimationFrame(scrollAnimationFrame)
      scrollAnimationFrame = null
    }

    if (isReducedMotion.value) {
      root.scrollTop = targetScrollTop
      return
    }

    const startScrollTop = root.scrollTop
    const distance = targetScrollTop - startScrollTop
    if (Math.abs(distance) < 1) {
      return
    }

    const startTime = performance.now()

    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / SNAP_DURATION_MS)
      root.scrollTop = startScrollTop + distance * easeInOutQuint(progress)

      if (progress < 1) {
        scrollAnimationFrame = requestAnimationFrame(step)
      } else {
        scrollAnimationFrame = null
      }
    }

    scrollAnimationFrame = requestAnimationFrame(step)
  }

  const lockWheel = () => {
    wheelLocked = true
    window.setTimeout(() => {
      wheelLocked = false
    }, WHEEL_COOLDOWN_MS)
  }

  const onWheel = (event: WheelEvent) => {
    if (!isStrictSnap.value || wheelLocked || Math.abs(event.deltaY) < WHEEL_SENSITIVITY) {
      return
    }

    event.preventDefault()
    const direction = event.deltaY > 0 ? 1 : -1
    scrollToSection(getCurrentIndex() + direction)
    lockWheel()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (!isStrictSnap.value) {
      return
    }

    const forwardKeys = ['ArrowDown', 'PageDown']
    const backwardKeys = ['ArrowUp', 'PageUp']

    if (forwardKeys.includes(event.key)) {
      event.preventDefault()
      scrollToSection(getCurrentIndex() + 1)
    }

    if (backwardKeys.includes(event.key)) {
      event.preventDefault()
      scrollToSection(getCurrentIndex() - 1)
    }

    if (event.key === 'Home') {
      event.preventDefault()
      scrollToSection(0)
    }

    if (event.key === 'End') {
      event.preventDefault()
      scrollToSection(sectionIds.length - 1)
    }
  }

  const onHashChange = () => {
    const targetId = window.location.hash.replace('#', '') as SectionId
    const index = sectionIds.findIndex((id) => id === targetId)
    if (index >= 0) {
      scrollToSection(index)
    }
  }

  onMounted(() => {
    const root = rootRef.value
    if (!root) {
      return
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('hashchange', onHashChange)
  })

  onBeforeUnmount(() => {
    const root = rootRef.value
    root?.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('hashchange', onHashChange)

    if (scrollAnimationFrame !== null) {
      cancelAnimationFrame(scrollAnimationFrame)
    }
  })

  return {
    isStrictSnap,
    scrollToSection,
  }
}
