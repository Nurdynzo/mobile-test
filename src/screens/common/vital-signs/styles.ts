import {ColorDefinitions} from '@/resources/colors';
import {wp} from '@/resources/config';
import {StyleSheet} from 'react-native';

export const vitalSignsStyles = ({colors}: {colors: ColorDefinitions}) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: wp(16),
      gap: wp(16),
    },
    contentTitle: {
      borderBottomColor: colors.text50,
      borderWidth: 0,
      borderBottomWidth: 0.2,
      paddingBottom: wp(10),
    },
    buttonWrapper: {flex: 1, padding: wp(16)},
    save: {alignSelf: 'flex-end', width: undefined},
    content: {
      backgroundColor: colors.white,
      padding: wp(16),
      borderRadius: wp(10),
      gap: wp(16),
    },
    takeContainer: {
      paddingHorizontal: wp(24),
      gap: wp(10),
    },
    topContent: {
      padding: wp(16),
      paddingTop: 0,
      borderRadius: wp(10),
      gap: wp(16),
    },
    predictiveTextContainer: {
      height: wp(40),
      width: '100%',
      paddingVertical: wp(8),
      paddingHorizontal: wp(12),
      borderRadius: wp(10),
      borderWidth: 1,
      borderColor: colors.neutral100,
      justifyContent: 'center',
    },
    chipsContainer: {
      height: wp(300),
      padding: wp(16),
      width: '100%',
      borderRadius: wp(10),
      borderWidth: 1,
      borderColor: colors.neutral100,
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: wp(16),
    },
    score: {
      flexDirection: 'row',
    },
    extra: {
      borderTopWidth: 1,
      marginTop: wp(20),
      borderColor: colors.neutral100,
      flex: 1,
      paddingTop: wp(12),
    },
    rowContainer: {
      padding: wp(6),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
