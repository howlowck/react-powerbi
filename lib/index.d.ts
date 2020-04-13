import { IEmbedConfiguration, Embed } from 'embed';
declare type EmbedType = 'report' | 'dashboard' | 'tile';
declare type PowerbiEmbeddedProps = Pick<IEmbedConfiguration, 'id' | 'width' | 'height' | 'pageName' | 'embedUrl' | 'tokenType' | 'accessToken' | 'permissions'> & {
    onEmbedded?: (embed: Embed) => void;
    embedType: EmbedType;
    mobile?: boolean;
    filterPaneEnabled?: boolean;
    navContentPaneEnabled?: boolean;
};
export default function PowerbiEmbedded({ onEmbedded, ...props }: PowerbiEmbeddedProps): JSX.Element;
export {};
