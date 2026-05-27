import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ModalBase from '@/components/ui/ModalBase.vue'
import { i18n, setLocale } from '@/i18n'

describe('ModalBase', () => {
  it('emits close on Escape', async () => {
    setLocale('en')

    const wrapper = mount(ModalBase, {
      props: {
        open: true,
        title: 'Career Locations',
      },
      slots: {
        default: '<button type="button">inside</button>',
      },
      global: {
        plugins: [i18n as never],
      },
      attachTo: document.body,
    })

    const dialog = document.body.querySelector('.modal-content')
    expect(dialog).toBeTruthy()
    dialog?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
