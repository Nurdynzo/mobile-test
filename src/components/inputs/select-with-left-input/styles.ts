import {ColorDefinitions} from '@/resources/colors';
import {wp} from '@/resources/config';
import {StyleSheet} from 'react-native';

export const AppSelectInputWithLeftInputStyles = ({
  colors,
}: {
  colors: ColorDefinitions;
}) =>
  StyleSheet.create({
    miniInput: {
      width: wp(50),
      height: wp(20),
      backgroundColor: colors.white,
      alignItems: 'center',
      borderColor: colors.neutral100,
      flexDirection: 'row',
      borderRightWidth: 1,
    },
    label: {marginBottom: wp(8)},
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.neutral100,
      borderRadius: wp(10),
      padding: 5,
    },
    input: {
      borderWidth: 0,
      paddingHorizontal: wp(10),
    },
  });
