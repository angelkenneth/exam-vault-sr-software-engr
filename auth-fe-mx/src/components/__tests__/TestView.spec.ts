import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TestView from '../presentation/TestView.vue'

describe('TestView', () => {
  it('renders properly', () => {
    const wrapper = mount(TestView, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
