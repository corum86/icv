import { describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'

vi.mock('@vue-leaflet/vue-leaflet', () => ({
  LMap: defineComponent({ template: '<div><slot /></div>' }),
  LTileLayer: defineComponent({ template: '<div />' }),
  LMarker: defineComponent({ template: '<div><slot /></div>' }),
  LPopup: defineComponent({ template: '<div><slot /></div>' }),
}))

import CVMap from '@/components/map/CVMap.vue'

describe('CVMap', () => {
  it('renders popup metadata for markers', () => {
    const wrapper = mount(CVMap, {
      props: {
        markers: [
          {
            id: 'place-a',
            title: 'Bucharest',
            role: 'Engineer',
            dateRange: '2023 - Present',
            summary: 'Built product platform',
            lat: 44.4268,
            lng: 26.1025,
          },
        ],
      },
    })

    expect(wrapper.text()).toContain('Bucharest')
    expect(wrapper.text()).toContain('Engineer')
  })
})
