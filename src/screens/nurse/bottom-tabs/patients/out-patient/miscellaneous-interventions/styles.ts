import {ColorDefinitions} from '@/resources/colors';
import {wp} from '@/resources/config';
import {StyleSheet} from 'react-native';

export const miscellaneousInterventionsStyles = ({
  colors,
}: {
  colors?: ColorDefinitions;
}) =>
  StyleSheet.create({
    screen: {
      gap: wp(10),
      paddingHorizontal: wp(20),
    },
    content: {
      backgroundColor: colors?.white,
      paddingHorizontal: wp(10),
      borderRadius: wp(10),
    },
    header: {paddingHorizontal: wp(16)},
    container: {
      gap: 10,
      marginTop: wp(10),
      flex: 1,
    },
    line: {
      height: 0.5,
      width: '100%',
      backgroundColor: colors?.neutral100,
      marginBottom: wp(16),
    },
    save: {alignSelf: 'flex-end', width: undefined, marginVertical: wp(32)},
    sheetContainer: {
      paddingHorizontal: wp(24),
      gap: wp(20),
      flex: 1,
    },
    sheetContent: {padding: wp(20), paddingTop: 0, gap: wp(16)},
    dropdownHeader: {
      padding: wp(10),
      borderRadius: wp(10),
    },
    bottomContent: {
      padding: wp(10),
      backgroundColor: colors?.white,
      borderRadius: wp(10),
    },
  });
