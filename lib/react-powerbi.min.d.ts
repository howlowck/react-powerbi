import React, * as react from 'react';
import  {TokenType,Permissions} from 'powerbi-models'

type EmbedType = 'report' | 'dashboard' | 'tile'

declare class PowerbiEmbedded extends React.Component<{
  accessToken: string,
  embedUrl: string,
  id: string,

  embedType?: EmbedType,
  tokenType?: TokenType,

  mobile?: boolean,
  filterPaneEnabled?: boolean,
  navContentPaneEnabled?: boolean,
  pageName?: string,
  permissions?: Permissions

  height?: string,
  width?: string,
}>{}

export default PowerbiEmbedded;