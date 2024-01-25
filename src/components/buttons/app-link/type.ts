import VoidFunction from '@/types/voidfunction';
import {ViewStyle} from 'react-native';

export type appLinkProps = {
  text: string;
  onPress?: VoidFunction;
  color?: string;
  align?: 'left' | 'center' | 'right';
  extraStyles?: ViewStyle;
};
