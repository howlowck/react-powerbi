import React from 'react';
import { IEmbedConfiguration, Embed } from 'embed';
declare type EmbedType = 'report' | 'dashboard' | 'tile';
interface ExtraSettings {
    onEmbedded?: (embed: Embed) => void;
    embedType?: EmbedType;
    mobile?: boolean;
    filterPaneEnabled?: boolean;
    navContentPaneEnabled?: boolean;
}
interface PowerbiEmbeddedProps extends IEmbedConfiguration, ExtraSettings {
}
declare const PowerbiEmbedded: React.FC<PowerbiEmbeddedProps>;
export default PowerbiEmbedded;
