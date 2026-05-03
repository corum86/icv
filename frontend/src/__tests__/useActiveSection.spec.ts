import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'

import { useActiveSection } from '@/composables/useActiveSection'
import type { SectionId } from '@/types/cv'

const sectionIds: SectionId[] = ['hero', 'about', 'experience']

describe('useActiveSection', () => {
  it('uses hash section as initial active id', async () => {
    window.history.replaceState(null, '', '#about')

    const TestHost = defineComponent({
      setup() {
        const root = document.createElement('div')
        sectionIds.forEach((id) => {
          const section = document.createElement('section')
          section.id = id
          root.appendChild(section)
        })

        const rootRef = ref<HTMLElement | null>(root)
        const state = useActiveSection(sectionIds, rootRef)
        return () => h('div', state.activeSection.value)
      },
    })

    const wrapper = mount(TestHost)
    await nextTick()
    expect(wrapper.text()).toContain('about')
  })
})
