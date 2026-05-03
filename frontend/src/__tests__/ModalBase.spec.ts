import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ModalBase from '@/components/ui/ModalBase.vue'

describe('ModalBase', () => {
  it('emits close on Escape', async () => {
    const wrapper = mount(ModalBase, {
      props: {
        open: true,
        title: 'Career Locations',
      },
      slots: {
        default: '<button type="button">inside</button>',
      },
      attachTo: document.body,
    })

    const dialog = document.body.querySelector('.modal-content')
    expect(dialog).toBeTruthy()
    dialog?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
