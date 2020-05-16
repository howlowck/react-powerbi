import React, { useState, useRef, useEffect, useCallback } from 'react'
import { factories, service, models } from 'powerbi-client'
import { TokenType, Permissions } from 'powerbi-models'
import { IEmbedConfiguration, Embed } from 'embed'

const powerbi = new service.Service(
  factories.hpmFactory,
  factories.wpmpFactory,
  factories.routerFactory
)

type EmbedType = 'report' | 'dashboard' | 'tile'

type ExtraSettings = {
  onEmbedded?: (embed: Embed) => void;
  embedType?: EmbedType;
  mobile?: boolean;
  filterPaneEnabled?: boolean;
  navContentPaneEnabled?: boolean;
}

type PowerBIEmbeddedProps = IEmbedConfiguration & ExtraSettings

const PowerBIEmbedded: React.FC<PowerBIEmbeddedProps> = (props: PowerBIEmbeddedProps) => {
  const { onEmbedded, embedType } = props
  const component = useRef<Embed | null>()
  const rootElement = useRef<HTMLElement>()
  const [ config, setConfig ] = useState<IEmbedConfiguration>({ type: embedType })

  const embed = useCallback(config => {
    component.current = powerbi.embed(rootElement.current as HTMLElement, config)

    if (onEmbedded) {
      onEmbedded(component.current)
    }

    return component.current
  }, [onEmbedded])

  useEffect(() => {
    setConfig(prevConfig => {
      const { embedType, mobile, tokenType, permissions, filterPaneEnabled, navContentPaneEnabled, settings, ...rest } = props

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
      embed(config)
    }
  }, [config, embed])

  useEffect(() => {
    const currentRootElement = rootElement.current as HTMLElement

    return (): void => {
      powerbi.reset(currentRootElement)
      component.current = null
    }
  }, [])

  return (
    <div className='powerbi-frame'
      ref={(el: HTMLDivElement): void => { rootElement.current = el }}
      style={{ width: props.width, height: props.height }} />
  )
}

PowerBIEmbedded.defaultProps = {
  embedType: 'report'
}

export default PowerBIEmbedded
