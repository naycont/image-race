import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import vuetify from '@/plugins/vuetify'
import ActionButton from '@/components/global/ActionButton.vue'

describe('Action Button', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(ActionButton, {
      global: {
        plugins: [vuetify]
      },
      props: { text: 'Action!' }
    })
  })

  it('renders properly', () => {
    expect(wrapper.text()).toContain('Action!')
  })
})
