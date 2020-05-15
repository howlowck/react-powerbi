import React from 'react'
import { shallow } from 'enzyme'
import PowerbiEmbedded from '../src/index'

// eslint-disable-next-line no-undef
test('renders a component', () => {
  const embedded = shallow(<PowerbiEmbedded />)

  expect(embedded).toMatchSnapshot()
})
