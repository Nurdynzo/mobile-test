import {StyleSheet} from 'react-native';
import {ColorDefinitions} from '@/resources/colors';
import {AppButtonStyle} from './type';
import {wp} from '@/resources/config';

export const appButtonStyles = ({
  height = 44,
  width,
  isDisabled,
  colors,
  borderColor = 'primary400',
  borderRadius = 10,
  borderWidth,
  buttonColor: bg = 'primary400',
  borderStyle,
  paddingHorizontal = 16,
  flex,
}: {
  isDisabled?: boolean;
  colors: ColorDefinitions;
} & AppButtonStyle) =>
  StyleSheet.create({
    container: {
      flex,
      gap: 8,
      width: width ? wp(width) : width === undefined ? width : '100%',
      height: wp(height),
      paddingHorizontal: wp(paddingHorizontal),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderStyle,
      backgroundColor: colors?.[isDisabled ? 'primary50' : bg],
      borderRadius: wp(borderRadius),
      borderWidth,
      borderColor: colors?.[isDisabled ? 'primary50' : borderColor],
    },
  });
