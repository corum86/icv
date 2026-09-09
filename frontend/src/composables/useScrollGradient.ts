import { onBeforeUnmount, watch, type Ref } from 'vue'

const PROGRESS_PROP = '--scroll-progress'

/**
 * Tracks vertical scroll progress (0..1) of the given scroll root and writes it
 * to the `--scroll-progress` custom property on <html>, so the body background
 * gradient in theme.css can interpolate smoothly as the user scrolls.
 */
export function useScrollGradient(scrollRootRef: Ref<HTMLElement | null>) {
  let frame = 0
  let boundEl: HTMLElement | null = null

  const write = (value: number) => {
    if (typeof document === 'undefined') {
      return
    }
    document.documentElement.style.setProperty(PROGRESS_PROP, value.toFixed(4))
  }

  const update = () => {
    frame = 0
    const el = boundEl
    if (!el) {
      return
    }

    const scrollable = el.scrollHeight - el.clientHeight
    const progress = scrollable > 0 ? el.scrollTop / scrollable : 0
    write(Math.min(1, Math.max(0, progress)))
  }

  const onScroll = () => {
    if (frame) {
      return
    }
    frame = requestAnimationFrame(update)
  }

  const bind = (el: HTMLElement | null) => {
    if (boundEl === el) {
      return
    }

    boundEl?.removeEventListener('scroll', onScroll)
    boundEl = el

    if (boundEl) {
      boundEl.addEventListener('scroll', onScroll, { passive: true })
      update()
    }
  }

  const stopWatch = watch(scrollRootRef, (el) => bind(el), { immediate: true })

  onBeforeUnmount(() => {
    stopWatch()
    if (frame) {
      cancelAnimationFrame(frame)
    }
    boundEl?.removeEventListener('scroll', onScroll)
    boundEl = null
    if (typeof document !== 'undefined') {
      document.documentElement.style.removeProperty(PROGRESS_PROP)
    }
  })
}
