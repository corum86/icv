import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

import type { SectionId } from '@/types/cv'

export function useActiveSection(
  sectionIds: SectionId[],
  scrollRootRef: Ref<HTMLElement | null>,
) {
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

  onMounted(() => {
    const root = scrollRootRef.value
    if (!root) {
      return
    }

    const hashId = window.location.hash.replace('#', '') as SectionId
    if (hashId && sectionIds.includes(hashId)) {
      activeSection.value = hashId
    }

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

        if (visible.length > 0) {
          const topEntry = visible[0]
          if (!topEntry) {
            return
          }

          const id = topEntry.target.getAttribute('id') as SectionId | null
          if (id && id !== activeSection.value) {
            setActive(id)
          }
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
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return {
    activeSection,
    setActive,
  }
}
