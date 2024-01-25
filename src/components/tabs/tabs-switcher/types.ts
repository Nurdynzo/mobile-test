import {ViewStyle} from 'react-native';

export type AppTabSwitcherProps = {
  selectedIndex?: number;
  tabs?: {name: string}[];
  onChangeTab?: (index: number) => void;
  disabled?: boolean;
  hasFlex?: boolean;
  extraStyles?: ViewStyle;
};
