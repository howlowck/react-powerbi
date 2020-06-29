import React from 'react';
import { IEmbedConfiguration } from 'embed';
declare type EmbedType = 'report' | 'dashboard' | 'tile';
declare type ExtraSettings = {
    embedType?: EmbedType;
    mobile?: boolean;
    filterPaneEnabled?: boolean;
    navContentPaneEnabled?: boolean;
};
declare type PowerBIEmbeddedProps = React.HTMLAttributes<HTMLDivElement> & IEmbedConfiguration & ExtraSettings;
declare const PowerBIEmbedded: React.FC<PowerBIEmbeddedProps>;
export default PowerBIEmbedded;
