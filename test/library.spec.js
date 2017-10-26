/* global describe it */

import React from 'react'
import { expect } from 'chai'
import { mount, configure } from 'enzyme'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import PowerbiEmbedded from '../lib/react-powerbi.min.js'

configure({ adapter: new Adapter() })

sinon.spy(PowerbiEmbedded.prototype, 'componentDidMount')

describe('<PowerEmbedded />', () => {
  it('calls componentDidMount', () => {
    mount(<PowerbiEmbedded />)

    expect(PowerbiEmbedded.prototype.componentDidMount.calledOnce).to.equal(true)
  })
})
