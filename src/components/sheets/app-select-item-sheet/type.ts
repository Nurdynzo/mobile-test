import {ReactNode} from 'react';
import {Animated, FlatListProps} from 'react-native';
import {ViewStyle} from 'react-native';
import {ColorKeys} from '@/resources/colors';
import {
  ItemOptionProp,
  SelectItem,
  SelectItemOptionsProp,
} from '@/types/selectItemsheet';
import {ModalizeSheetRef} from '@/types/sheet';

export type OnSelectItemProp<T> = (props: {item: SelectItem<T>}) => void;

export type selectedProps = {
  value: string;
  label: string;
  id: string;
} | null;

export type AppSelectItemProps<T> = {
  FooterComponent?: ReactNode;
  isMultiSelect?: boolean;
  adjustToContentHeight?: boolean;
  isOptionSelected?: (option: ItemOptionProp<T>) => boolean;
  selectOptions?: SelectItemOptionsProp<T>;
  selectedValue?: string;
  title?: string;
  HeaderRightContent?: ReactNode;
  AdditionalHeaderContent?: ReactNode;
  renderRightIcon?: (props: {
    isSelected?: boolean;
    item?: ItemOptionProp<T>;
  }) => ReactNode;
  onSearchInputChange?: (value: string) => void;
  searchValue?: string;
  onSelectItem?: OnSelectItemProp<T>;
  sheetRef?: ModalizeSheetRef;
  closeSheet?: () => void;
  removeHeader?: boolean;
  showSearchInput?: boolean;
  searchPlaceholder?: string;
  modalHeight?: number;
  onOpen?: () => void;
  onClose?: () => void;
  isLoading?: boolean;
  error?: {
    value: boolean;
    onPressRefresh?: () => void;
    refreshBtnText?: string;
    title?: string;
    description?: string;
  };
  flatlistProps?: Animated.AnimatedProps<
    Omit<
      FlatListProps<ItemOptionProp<T>>,
      | 'data'
      | 'keyExtractor'
      | 'renderItem'
      | 'horizontal'
      | 'showsVerticalScrollIndicator'
      | 'showsHorizontalScrollIndicator'
      | 'ListEmptyComponent'
    >
  >;
};
export type SelectOptionItemProps<T> = {
  optionItem: ItemOptionProp<T>;
  onCloseSheet?: () => void;
  style?: ViewStyle;
  renderRightIcon?: (props: {
    isSelected?: boolean;
    item?: ItemOptionProp<T>;
  }) => ReactNode;
  valueTextColor?: ColorKeys;
  valueOptionTextColor?: ColorKeys;
  selectedValue?: string;
  onPressItem?: OnSelectItemProp<T>;
  isMultiSelect?: boolean;
  isOptionSelected?: (option: ItemOptionProp<T>) => boolean;
};
