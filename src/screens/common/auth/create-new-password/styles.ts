import {StyleSheet} from 'react-native';

export const createNewPasswordStyles = () =>
  StyleSheet.create({
    sheetContainer: {
      padding: 16,
      gap: 24,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      flex: 1,
    },
    sheetTextWrapper: {paddingHorizontal: 10, gap: 8},
  });
