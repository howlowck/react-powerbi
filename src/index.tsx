import React, { useState, useRef, useEffect, useCallback, ComponentProps, Props } from 'react'
import { factories, service, models } from 'powerbi-client'
import { TokenType, Permissions } from 'powerbi-models'
import { IEmbedConfiguration, Embed } from 'embed'

const powerbi = new service.Service(
  factories.hpmFactory,
  factories.wpmpFactory,
  factories.routerFactory
)

type EmbedType = 'report' | 'dashboard' | 'tile'

interface PowerBIEmbeddedProps extends IEmbedConfiguration, React.HTMLAttributes<HTMLDivElement> {
  // onEmbed?: () => void;
  embedType?: EmbedType;
  mobile?: boolean;
  filterPaneEnabled?: boolean;
  navContentPaneEnabled?: boolean;
}

const PowerBIEmbedded: React.FC<PowerBIEmbeddedProps> = (props: PowerBIEmbeddedProps) => {
  const { embedType } = props
  const component = useRef<Embed | null>()
  const rootElement = useRef<HTMLDivElement>()
  const [ embedObj, setEmbedObj ] = useState<Embed>()

  function validateConfig (embedType: PowerBIEmbeddedProps['embedType'] = 'report', config: IEmbedConfiguration): boolean {
    const validateFuncs = {
      'report': models.validateReportLoad,
      'dashboard': models.validateDashboardLoad,
      'tile': models.validateTileLoad
    }
    const errors = validateFuncs[embedType](config)
    console.error('PowerBI Embed Config Error, See Error Array -> ', errors)
    return errors === undefined
  }

  function getConfigFromProps(props: PowerBIEmbeddedProps, prev?: IEmbedConfiguration): IEmbedConfiguration {
    const {
      embedType,
      mobile,
      tokenType,
      permissions,
      filterPaneEnabled,
      navContentPaneEnabled,
      settings,
      ...rest
    } = props

    return {
      ...prev,
      ...rest,
      settings: {
        ...settings,
        filterPaneEnabled,
        navContentPaneEnabled,
        layoutType: mobile ? models.LayoutType.MobilePortrait : undefined
      },
      permissions: permissions || Permissions.All,
      tokenType: tokenType || TokenType.Embed,
      type: embedType || 'report'
    }
  }

  useEffect(() => {
    return (): void => {
      const currentRootElement = rootElement.current as HTMLElement
      powerbi.reset(currentRootElement)
      component.current = null
    }
  }, [props.mobile])


  useEffect(() => {
    console.log('tried to run')
    const config = getConfigFromProps(props)
    if (validateConfig(embedType, config)) {
      console.log('validated')
      const embed = powerbi.embed(rootElement.current as HTMLDivElement, config)
      setEmbedObj(embed)
    }
    return (): void => {
      const currentRootElement = rootElement.current as HTMLElement
      powerbi.reset(currentRootElement)
      component.current = null
    }
  }, [])

  useEffect(() => {
    if (!embedObj) {
      return
    }
    const config = getConfigFromProps(props)
    if (!validateConfig(embedType, config)) {
      return
    }
    powerbi.embed(rootElement.current as HTMLDivElement, config)
  }, [props])

  return (
    <div className='powerbi-container'
      style={{ width: props.width, height: props.height }}
      ref={(el: HTMLDivElement): void => { rootElement.current = el }}
    >
    </div>
  )
}

PowerBIEmbedded.defaultProps = {
  embedType: 'report',
}

export default PowerBIEmbedded
