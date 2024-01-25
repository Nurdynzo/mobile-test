import {ColorDefinitions, ColorKeys} from '@/resources/colors';
import VoidFunction from '@/types/voidfunction';
import {moreVitalsTitle, vitalsArrayTitle} from '@/utils/constants';
import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';

export type NumericInputProps = {
  title: string;
  hasToggle?: boolean;
  hasDropDown?: boolean;
  onPressToggle?: VoidFunction;
  onPressDropDown?: VoidFunction;
  name?: string;
  value?: number;
  getCount?: (count: number) => void;
  getToggleValue?: (value: boolean) => void;
  customContent?: ReactNode;
  customRightContent?: ReactNode;
  hasBorder?: boolean;
};

export type ButtonTypes = {
  icon?: ReactNode;
  bg: ColorKeys;
  borderColor: ColorKeys;
  extraStyles?: ViewStyle;
  onPress?: VoidFunction;
  colors: ColorDefinitions;
  disabled?: boolean;
};

export type VitalTypes = {
  title: vitalsArrayTitle;
  value: number;
  name: string;
  hasToggle?: boolean;
  hasDropDown?: boolean;
  hasBorder?: boolean;
  customContent?: ReactNode;
  onPressDropDown?: VoidFunction;
  customRightContent?: ReactNode;
};

export type MoreVitalTypes = {
  title: moreVitalsTitle;
  value: number;
  name: string;
  hasToggle?: boolean;
  hasDropDown?: boolean;
  hasBorder?: boolean;
  customContent?: ReactNode;
  onPressDropDown?: VoidFunction;
  customRightContent?: ReactNode;
};

export type SelectedProps = {
  value: string;
  label: string;
  id: string;
} | null;

export type VitalsProps = {
  heartRate: SelectedProps;
  height: SelectedProps;
  temperature: SelectedProps;
  spo2: SelectedProps;
};

export type ScoreType = {
  text: string;
  score: number;
} | null;

export type Menu =
  | 'Recheck'
  | 'Link to care plan'
  | 'Link to event'
  | 'Link to examination'
  | 'Highlight for attention'
  | 'Delete';

export type OptionProps = {
  color?: ColorKeys;
  icon?: () => ReactNode;
  id?: string;
  label?: Menu;
  value: Menu;
  onPress?: () => void;
  disableCloseSheetOnPress?: boolean;
  renderRightIcon?: () => ReactNode;
  valueOptions?: VitalsMenuOptionsProp;
};

export type VitalsMenuOptionsProp = OptionProps[];
