import { mount } from '~/.nuxt/node_modules/@vue/test-utils/types'
import NuxtLogo from '@/components/NuxtLogo.vue'

describe('NuxtLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(NuxtLogo)
    expect(wrapper.vm).toBeTruthy()
  })
})
