import {SnowstormSimpleResponseDto} from '@/state/services/snowstorm';
import VoidFunction from '@/types/voidfunction';
import {ReactNode} from 'react';

export type CollapsibleSiteCardProps = {
  leadingLabel?: string;
  shouldOpen?: boolean;
  title?: string;
  data?: Array<{id: string; name: string}>;
  suggestions?: SnowstormSimpleResponseDto[];
  isSummary?: boolean;
  isPreviewing?: boolean;
  selectedData?: SnowstormSimpleResponseDto[];
  formProps?: {
    selectedItems: SnowstormSimpleResponseDto[];
    setSelectedItems: React.Dispatch<
      React.SetStateAction<SnowstormSimpleResponseDto[]>
    >;
    text: string;
    setText: React.Dispatch<string>;
    handleAddItem: (props: SnowstormSimpleResponseDto) => void;
    handleRemoveItem: (props: SnowstormSimpleResponseDto) => void;
  };
  handleRemoveItem?: (props: SnowstormSimpleResponseDto) => void;
  onPressSave?: VoidFunction;
  summaries?: ReactNode;
  onToggle?: VoidFunction;
  customContent?: ReactNode;
};
