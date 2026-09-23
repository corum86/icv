import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

import type { SectionId } from '@/types/cv'

export function useActiveSection(sectionIds: SectionId[], scrollRootRef: Ref<HTMLElement | null>) {
  const activeSection = ref<SectionId>(sectionIds[0] ?? 'hero')
  let observer: IntersectionObserver | null = null
  let boundRoot: HTMLElement | null = null

  // The last section is often too short to reach the detection band, so reaching
  // the bottom of the scroll root activates it explicitly.
  const onScroll = () => {
    const root = boundRoot
    const lastId = sectionIds[sectionIds.length - 1]
    if (root && lastId && root.scrollTop + root.clientHeight >= root.scrollHeight - 2) {
      if (activeSection.value !== lastId) {
        setActive(lastId)
      }
    }
  }

  const syncHash = (sectionId: SectionId) => {
    if (window.location.hash !== `#${sectionId}`) {
      history.replaceState(null, '', `#${sectionId}`)
    }
  }

  const setActive = (sectionId: SectionId) => {
    activeSection.value = sectionId
    syncHash(sectionId)
  }

  onMounted(() => {
    const root = scrollRootRef.value
    if (!root) {
      return
    }

    const hashId = window.location.hash.replace('#', '') as SectionId
    if (hashId && sectionIds.includes(hashId)) {
      activeSection.value = hashId
    }

    // A thin band ~25% below the top of the viewport: whichever section crosses it
    // is active, regardless of how tall the section is.
    observer = new IntersectionObserver(
      (entries) => {
        const crossing = entries.find((entry) => entry.isIntersecting)
        const id = crossing?.target.getAttribute('id') as SectionId | null | undefined
        if (id && id !== activeSection.value) {
          setActive(id)
        }
      },
      {
        root,
        rootMargin: '-25% 0px -74% 0px',
        threshold: 0,
      },
    )

    sectionIds.forEach((id) => {
      const section = root.querySelector<HTMLElement>(`#${id}`)
      if (section) {
        observer?.observe(section)
      }
    })

    boundRoot = root
    root.addEventListener('scroll', onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    boundRoot?.removeEventListener('scroll', onScroll)
  })

  return {
    activeSection,
    setActive,
  }
}
