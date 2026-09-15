import { onBeforeUnmount, ref, watch, type Ref } from 'vue'

import type { SectionId } from '@/types/cv'

export function useActiveSection(sectionIds: SectionId[], scrollRootRef: Ref<HTMLElement | null>) {
  const activeSection = ref<SectionId>(sectionIds[0] ?? 'hero')
  let observer: IntersectionObserver | null = null

  const syncHash = (sectionId: SectionId) => {
    if (window.location.hash !== `#${sectionId}`) {
      history.replaceState(null, '', `#${sectionId}`)
    }
  }

  const setActive = (sectionId: SectionId) => {
    activeSection.value = sectionId
    syncHash(sectionId)
  }

  const observe = (root: HTMLElement) => {
    observer?.disconnect()

    const hashId = window.location.hash.replace('#', '') as SectionId
    if (hashId && sectionIds.includes(hashId)) {
      activeSection.value = hashId
    }

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

        const topEntry = visible[0]
        if (!topEntry) {
          return
        }

        const id = topEntry.target.getAttribute('id') as SectionId | null
        if (id && id !== activeSection.value) {
          setActive(id)
        }
      },
      {
        root,
        threshold: [0.4, 0.65, 0.9],
      },
    )

    sectionIds.forEach((id) => {
      const section = root.querySelector<HTMLElement>(`#${id}`)
      if (section) {
        observer?.observe(section)
      }
    })
  }

  const stopWatch = watch(
    scrollRootRef,
    (root) => {
      if (root) {
        observe(root)
      } else {
        observer?.disconnect()
        observer = null
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    stopWatch()
    observer?.disconnect()
  })

  return {
    activeSection,
    setActive,
  }
}
