import {ColorDefinitions} from '@/resources/colors';
import {wp} from '@/resources/config';
import {StyleSheet} from 'react-native';

export const investigationStyles = ({
  colors,
  hasBottomBorder = false,
}: {
  colors: ColorDefinitions;
  hasBottomBorder?: boolean;
}) =>
  StyleSheet.create({
    recentResultContainer: {
      backgroundColor: colors.white,
      padding: wp(10),
      gap: wp(16),
      overflow: 'scroll',
      borderRadius: wp(10),
    },
    addNotesButton: {
      alignSelf: 'flex-start',
    },
    tabWrapper: {gap: wp(10), overflow: 'hidden'},
    recentResultContainerHeader: {
      paddingBottom: wp(10),
      borderBottomColor: colors.neutral100,
      borderBottomWidth: wp(1),
      borderRadius: wp(5),
    },
    iconWithText: {
      flexDirection: 'row',
      gap: wp(5),
    },
    miniSaveBtn: {
      marginTop: wp(16),
      width: wp(80),
      alignSelf: 'flex-end',
    },
    borderTop: {
      borderWidth: 0,
      borderTopWidth: wp(1),
      paddingTop: wp(10),
      borderTopColor: colors.neutral100,
    },
    viewBtn: {marginTop: 0, height: wp(35)},
    signs: {
      borderWidth: 0,
      borderBottomWidth: hasBottomBorder ? 0.5 : 0,
      borderTopWidth: 0.5,
      borderColor: colors.neutral100,
      paddingTop: wp(15),
    },
    //media
    mediaPreview: {
      width: wp(160),
      overflow: 'hidden',
      gap: wp(5),
    },
    mediaContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
