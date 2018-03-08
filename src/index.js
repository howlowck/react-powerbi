import React from 'react'
import * as pbi from 'powerbi-client'

const powerbi = new pbi.service.Service(
  pbi.factories.hpmFactory,
  pbi.factories.wpmpFactory,
  pbi.factories.routerFactory)

class PowerbiEmbedded extends React.Component {
  constructor (props) {
    super(props)
    this.component = null
    this.rootElement = null
    this.state = {
      type: 'report'
    }
  }

  componentDidMount () {
    this.updateState(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.updateState(nextProps)
  }

  componentDidUpdate () {
    if (this.validateConfig(this.state)) {
      this.embed(this.state)
    }
  }

  componentWillUnmount () {
    powerbi.reset(this.rootElement)
    this.component = null
  }

  embed (config) {
    this.component = powerbi.embed(this.rootElement, config)
    if (this.props.onEmbedded) {
      this.props.onEmbedded(this.component)
    }
    return this.component
  }

  updateState (props) {
    const nextState = Object.assign({}, this.state, props, {
      settings: {
        filterPaneEnabled: this.props.filterPaneEnabled,
        navContentPaneEnabled: this.props.navContentPaneEnabled
      }
    })
    /**
     * This property must be removed from the state object so that it doesn't get used in the embedConfig.
     * This would be passed to `powerbi.embed(element, embedConfig)` and attempted to be sent over postMessage;
     * however, functions cannot be cloned and it will fail.
     */

    delete nextState.onEmbedded
    this.setState(nextState)
  }

  validateConfig (config) {
    console.log(config)
    const errors = pbi.models.validateReportLoad(config)

    // console.dir(pbi.service.Service)
    console.log('error', errors)
    return (errors === undefined)
  }

  render () {
    const dimensions = {
      width: this.props.width,
      height: this.props.height
    }

    return (
      <div className='powerbi-frame' ref={(el) => { this.rootElement = el }} style={dimensions} />
    )
  }
}

export default PowerbiEmbedded
