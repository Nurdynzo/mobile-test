import {ReactNode} from 'react';
import {TextProps} from 'react-native';
import {TextStyle} from 'react-native/types';
import {ColorKeys} from '../../../resources/colors';
import {TypographyKeys} from '../../../resources/fonts';

export type AlignTypes = 'left' | 'center' | 'right' | 'auto';
export type TextTranformTypes =
  | 'none'
  | 'capitalize'
  | 'uppercase'
  | 'lowercase'
  | undefined;

export type AppTextProps = {
  text?: string | ReactNode;
  style?: TextStyle;
  color?: ColorKeys;
  align?: AlignTypes;
  type?: TypographyKeys;
  children?: React.ReactNode;
  onPress?: () => void;
  textTransform?: TextTranformTypes;
} & TextProps;
