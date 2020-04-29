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

type PowerbiEmbeddedProps = Pick<IEmbedConfiguration,
'id' |
'width' |
'height' |
'pageName' |
'embedUrl' |
'tokenType' |
'accessToken' |
'permissions'> & {
  onEmbedded?: (embed: Embed) => void;
  embedType?: EmbedType;
  mobile?: boolean;
  filterPaneEnabled?: boolean;
  navContentPaneEnabled?: boolean;
};

export default function PowerbiEmbedded ({ onEmbedded, ...props }: PowerbiEmbeddedProps): JSX.Element {
  const component = useRef<Embed | null>()
  const rootElement = useRef<HTMLElement>()
  const [ config, setConfig ] = useState<IEmbedConfiguration>({ type: 'report' })

  const embed = useCallback(config => {
    component.current = powerbi.embed(rootElement.current as HTMLElement, config)

    if (onEmbedded) {
      onEmbedded(component.current)
    }

    return component.current
  }, [onEmbedded])

  useEffect(() => {
    setConfig(prevConfig => {
      const { embedType, mobile, pageName, tokenType, permissions, filterPaneEnabled, navContentPaneEnabled } = props

      return {
        ...prevConfig,
        ...props,
        pageName,
        settings: {
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
