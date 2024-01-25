import {SnowstormSimpleResponseDto} from '@/state/services/snowstorm';
import VoidFunction from '@/types/voidfunction';

export type AllInputsSuggestionFormHookType = {
  selectedItems: SnowstormSimpleResponseDto[];
  setSelectedItems: React.Dispatch<
    React.SetStateAction<SnowstormSimpleResponseDto[]>
  >;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleAddItem: (props: SnowstormSimpleResponseDto) => void;
  handleRemoveItem: (props: SnowstormSimpleResponseDto) => void;
  reset: VoidFunction;
};
