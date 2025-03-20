import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import vuetify from '@/plugins/vuetify'
import HomeView from '@/views/HomeView.vue'

vi.mock('vue-router')

const mockRoutePush = vi.fn()

vi.mock('vue-router', async () => {
  return {
    RouterView: {},
    useRouter: () => {
      return {
        push: mockRoutePush
      }
    }
  }
})

describe('HomeView', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(HomeView, {
      global: {
        plugins: [vuetify]
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders properly', () => {
    expect(HomeView).toBeTruthy()
    expect(wrapper.find('[data-testid=home]').exists()).toBe(true)
  })

  it('has a title', () => {
    expect(wrapper.find('[data-testid=home__title]').exists()).toBe(true)
  })

  it('has a title with alegra link', async () => {
    const selector = '[data-testid=home__title--link]'

    const a = wrapper.find(selector)
    expect(a.exists()).toBe(true)
    expect(a.text()).toContain('Alegra')

    const spyOnA = vi.spyOn(a, 'trigger')

    await a.trigger('click')

    expect(spyOnA).toHaveBeenCalledOnce()
  })

  it('has start Button', () => {
    const selector = '[data-testid=home__start-button]'
    wrapper.findComponent({ name: 'ActionButton' })
    expect(wrapper.find(selector).exists()).toBe(true)
    expect(wrapper.find(selector).text()).toContain('Empezar')
  })

  it('redirect to race view on click start button', async () => {
    await wrapper.find('[data-testid=home__start-button]').trigger('click')

    expect(mockRoutePush).toHaveBeenCalled()
    expect(mockRoutePush).toHaveBeenCalledWith(expect.objectContaining({ name: 'race' }))
  })
})
