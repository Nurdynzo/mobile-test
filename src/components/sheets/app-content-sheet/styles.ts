import {StyleSheet} from 'react-native';
import {ColorDefinitions} from '@/resources/colors';
import {wp} from '@/resources/config';

export const appContentSheetStyle = ({
  colors,
}: {colors?: ColorDefinitions} = {}) =>
  StyleSheet.create({
    overlay: {backgroundColor: colors?.overlay},
    modal: {
      borderTopLeftRadius: wp(24),
      borderTopRightRadius: wp(24),
      backgroundColor: colors?.background,
      overflow: 'hidden',
    },
    handle: {backgroundColor: colors?.neutral500},
    container: {
      paddingBottom: wp(32),
    },
    optionsContainer: {gap: wp(24)},
    titleContainer: {
      marginTop: wp(32),
      paddingHorizontal: wp(24),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerContent: {
      paddingBottom: wp(16),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
  });
