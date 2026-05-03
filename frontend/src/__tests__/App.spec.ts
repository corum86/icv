import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders sections after bootstrap fetch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ name: 'Sergkei Kournosenkov', title: 'Web- und Softwareentwickler' }),
      }),
    )

    const wrapper = mount(App)
    await nextTick()
    await new Promise((resolve) => window.setTimeout(resolve, 0))
    await nextTick()

    expect(wrapper.text()).toContain('Berufserfahrung')
    expect(wrapper.text()).toContain('Kontakt')
  })
})
