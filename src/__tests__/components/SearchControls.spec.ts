import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import SearchControls from '@/components/race/SearchControls.vue'
import vuetify from '@/plugins/vuetify'

describe('SearchControls', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(SearchControls, {
      global: {
        plugins: [vuetify]
      },
      props: {
        restartBtnDisabled: false,
        isLoading: false
      }
    })
  })

  it('renders properly', () => {
    expect(SearchControls).toBeTruthy()
    expect(wrapper.find('[data-testid=search]').exists()).toBe(true)
  })

  it('has textfield', () => {
    expect(wrapper.find('[data-testid=search__textfield]').exists()).toBe(true)
  })

  it('has restart button', () => {
    expect(wrapper.find('[data-testid=search__restart-button]').exists()).toBe(true)
  })

  it('has search button', () => {
    const selector = '[data-testid=search__search-button]'
    expect(wrapper.find(selector).exists()).toBe(true)
    expect(wrapper.find(selector).text()).toContain('Buscar')
  })

  it('emit event to parent on click search button', async () => {
    console.log('------------')
    const textfield = wrapper.find('[data-testid=search__textfield]')
    const input = textfield.find('input')
    // Simulate user typing a message
    await input.setValue('fire')

    // Simulate clicking the send button
    await wrapper.find('[data-testid=search__search-button]').trigger('click')

    // Verify the correct event was emitted with the message
    const eventEmitted = wrapper.emitted('searchImage')
    expect(eventEmitted).toBeTruthy()
    expect(eventEmitted?.length).toBe(1)

    expect(eventEmitted[0]).toEqual(['fire'])
  })
})
