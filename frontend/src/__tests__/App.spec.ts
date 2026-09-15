import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'

import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { i18n, setLocale } from '@/i18n'
import { cvData } from '@/data/cvData'

describe('App', () => {
  it('renders sections after bootstrap fetch', async () => {
    setLocale('de')

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((input: RequestInfo | URL) => {
        const url = String(input)

        if (url.includes('/api/profile')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              name: 'Sergkei Kournosenkov',
              title: 'Web- und Softwareentwickler',
            }),
          })
        }

        if (url.includes('/api/cv')) {
          return Promise.resolve({
            ok: true,
            json: async () => cvData,
          })
        }

        return Promise.resolve({
          ok: false,
          json: async () => ({}),
        })
      }),
    )

    const wrapper = mount(App, {
      global: {
        plugins: [i18n as never],
      },
    })
    await nextTick()
    await new Promise((resolve) => window.setTimeout(resolve, 0))
    await nextTick()

    expect(wrapper.text()).toContain('Berufserfahrung')
    expect(wrapper.text()).toContain('Kontakt')
  })
})
