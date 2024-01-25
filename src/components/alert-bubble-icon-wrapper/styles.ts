import {ColorDefinitions} from '@/resources/colors';
import {wp} from '@/resources/config';
import {StyleSheet} from 'react-native';

export const alertBubbleIconWrapperStyles = (colors: ColorDefinitions) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors?.primary100,
      width: wp(72),
      height: wp(72),
      borderRadius: wp(72),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
