import {Component} from 'react'

import * as powerbi from 'powerbi-client'

// export interface IProps {
//   id: string;
//   accessToken: string;
//   embedUrl: string;
//   pageName?: string;
//   filters?: pbi.models.IFilter[];
//   filterPaneEnabled?: boolean;
//   navContentPaneEnabled?: boolean;
//   onEmbedded?: (embed: pbi.Embed) => any;
//   width?: 600;
//   height?: 900;
// }

class PowerbiEmbedded extends Component {
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
    this.reset()
  }

  embed (config) {
    this.component = powerbi.embed(this.rootElement, config)
    if (this.props.onEmbedded) {
      this.props.onEmbedded(this.component)
    }
    return this.component
  }

  reset () {
    powerbi.reset(this.rootElement)
    this.component = null
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
    const errors = powerbi.models.validateReportLoad(config)

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

// Report.propTypes = {
//   accessToken: React.PropTypes.string,
//   embedUrl: React.PropTypes.string
// }
export default PowerbiEmbedded
