/* global test */

import React from 'react'
import { shallow } from 'enzyme'
import PowerbiEmbedded from '../src/index'

test('renders a component', () => {
  const embedded = shallow(<PowerbiEmbedded />)

  expect(embedded).toMatchSnapshot()
})

test('accepts props', () => {
  const embedded = shallow(<PowerbiEmbedded
    embedUrl='abc' />)

  expect(embedded).toMatchSnapshot()
})
