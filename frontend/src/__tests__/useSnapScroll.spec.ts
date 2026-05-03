import { describe, expect, it, beforeEach, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'

import { useSnapScroll } from '@/composables/useSnapScroll'
import type { SectionId } from '@/types/cv'

const sectionIds: SectionId[] = ['hero', 'about', 'experience']

describe('useSnapScroll', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }))
  })

  it('exposes strict snap mode for desktop', () => {
    const TestHost = defineComponent({
      setup() {
        const rootRef = ref<HTMLElement | null>(document.createElement('div'))
        const reducedMotion = ref(false)
        const state = useSnapScroll({ sectionIds, rootRef, isReducedMotion: reducedMotion })
        return () => h('div', state.isStrictSnap.value ? 'strict' : 'relaxed')
      },
    })

    const wrapper = mount(TestHost)
    expect(wrapper.text()).toContain('strict')
  })
})
