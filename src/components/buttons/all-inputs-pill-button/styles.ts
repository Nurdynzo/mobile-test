import {ColorDefinitions} from '@/resources/colors';
import {wp} from '@/resources/config';
import {StyleSheet} from 'react-native';

export const allInputsPillButtonStyles = ({
  colors,
  isSelected,
  borderWidth,
}: {
  colors: ColorDefinitions;
  isSelected?: boolean;
  borderWidth?: number;
}) => {
  return StyleSheet.create({
    button: {
      gap: 8,
      flexShrink: 1,
      flexDirection: 'row',
      paddingVertical: wp(6),
      alignItems: 'center',
      paddingHorizontal: wp(12),
      borderRadius: wp(16),
      backgroundColor: colors.neutral200,
      borderWidth,
      borderColor: colors?.[isSelected ? 'text300' : 'neutral200'],
    },
  });
};
