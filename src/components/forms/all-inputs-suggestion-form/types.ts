import {SnowstormSimpleResponseDto} from '@/state/services/snowstorm';
import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';

export type AllInputsSuggestionFormProps = {
  ContentInBetweenSuggesstionsFields?: ReactNode;
  isSingleSelect?: boolean;
  expandSheetHeaderTitle: string;
  suggestions: SnowstormSimpleResponseDto[];
  ActionBtnContent?: ReactNode;
  showTextInput?: boolean;
  showRightView?: boolean;
  extraBaseContainerStyle?: ViewStyle;
  formProps: {
    selectedItems: SnowstormSimpleResponseDto[];
    setSelectedItems: React.Dispatch<
      React.SetStateAction<SnowstormSimpleResponseDto[]>
    >;
    text: string;
    setText: React.Dispatch<string>;
    handleAddItem: (props: SnowstormSimpleResponseDto) => void;
    handleRemoveItem: (props: SnowstormSimpleResponseDto) => void;
  };
};
