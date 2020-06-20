import React, { useState, useRef, useEffect, useCallback, ComponentProps } from 'react'
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
  onLoad?: () => void;
  embedType?: EmbedType;
  mobile?: boolean;
  filterPaneEnabled?: boolean;
  navContentPaneEnabled?: boolean;
}

const PowerBIEmbedded: React.FC<PowerBIEmbeddedProps> = (props: PowerBIEmbeddedProps) => {
  const { embedType } = props
  const component = useRef<Embed | null>()
  const rootElement = useRef<HTMLDivElement>()
  const [ config, setConfig ] = useState<IEmbedConfiguration>({ type: embedType })

  useEffect(() => {
    setConfig(prevConfig => {
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
        ...prevConfig,
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
    })
  }, [props])

  useEffect(() => {
    function validateConfig (config: IEmbedConfiguration): boolean {
      const errors = models.validateReportLoad(config)

      return errors === undefined
    }

    if (validateConfig(config)) {
      powerbi.embed(rootElement.current as HTMLDivElement, config)
    }
  }, [config])

  useEffect(() => {
    const currentRootElement = rootElement.current as HTMLElement

    return (): void => {
      powerbi.reset(currentRootElement)
      component.current = null
    }
  }, [])

  return (
    <div className='powerbi-container'
      style={{ width: props.width, height: props.height }}
      ref={(el: HTMLDivElement): void => { rootElement.current = el }}
    >
    </div>
  )
}

PowerBIEmbedded.defaultProps = {
  embedType: 'report'
}

export default PowerBIEmbedded
