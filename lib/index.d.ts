import React from 'react';
import { IEmbedConfiguration } from 'embed';
declare type EmbedType = 'report' | 'dashboard' | 'tile';
interface PowerBIEmbeddedProps extends IEmbedConfiguration, React.HTMLAttributes<HTMLDivElement> {
    onEmbed?: () => void;
    embedType?: EmbedType;
    mobile?: boolean;
    filterPaneEnabled?: boolean;
    navContentPaneEnabled?: boolean;
}
declare const PowerBIEmbedded: React.FC<PowerBIEmbeddedProps>;
export default PowerBIEmbedded;
