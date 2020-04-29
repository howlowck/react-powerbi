import React from 'react';
import { IEmbedConfiguration, Embed } from 'embed';
declare type EmbedType = 'report' | 'dashboard' | 'tile';
declare type PowerbiEmbeddedProps = Pick<IEmbedConfiguration, 'id' | 'width' | 'height' | 'pageName' | 'embedUrl' | 'tokenType' | 'accessToken' | 'permissions'> & {
    onEmbedded?: (embed: Embed) => void;
    embedType?: EmbedType;
    mobile?: boolean;
    filterPaneEnabled?: boolean;
    navContentPaneEnabled?: boolean;
};
declare const PowerbiEmbedded: React.FC<PowerbiEmbeddedProps>;
export default PowerbiEmbedded;
