import {ColorDefinitions} from '@/resources/colors';
import {SCREEN_HEIGHT, wp} from '@/resources/config';
import {StyleSheet} from 'react-native';

export const doctorPatientStyle = ({
  colors,
  cardHeaderHasBackground,
}: {
  colors?: ColorDefinitions;
  cardHeaderHasBackground?: boolean;
  hasResults?: boolean;
}) =>
  StyleSheet.create({
    resultsContainer: {
      borderRadius: 10,
      overflow: 'hidden',
      maxHeight: SCREEN_HEIGHT / 2,
      backgroundColor: colors?.white,
    },
    description: {
      width: '60%',
    },
    wrapper: {
      backgroundColor: colors?.white,
      borderRadius: 10,
      overflow: 'hidden',
      marginHorizontal: 24,
      marginBottom: 16,
    },
    container: {
      borderRadius: 32,
      backgroundColor: 'white',
      width: 201,
      height: 40,
      padding: 4,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    innerViewCommon: {
      borderRadius: 23,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 7,
      padding: 12,
      backgroundColor: cardHeaderHasBackground
        ? colors?.neutral100
        : 'transparent',
      borderRadius: 10,
    },
    headerAvatar: {
      height: 30,
      width: 30,
      borderRadius: 30,
      backgroundColor: colors?.neutral25,
      alignSelf: 'center',
    },
    headerContent: {
      flex: 1,
      alignItems: 'flex-start',
      gap: 4,
    },
    headerStatus: {
      paddingVertical: 2,
      paddingHorizontal: 8,
      backgroundColor: colors?.primary25,
      borderRadius: 8,
    },
    cardContainer: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      gap: 16,
      padding: 16,
      paddingTop: 0,
    },
    rowSpaceBetween: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    rowSpaceEvenly: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    rowStart: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
    },
  });

export const profileStyles = ({colors}: {colors?: ColorDefinitions}) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: wp(15),
      backgroundColor: colors?.default300,
      borderRadius: wp(10),
    },
    screen: {flex: 1, paddingHorizontal: wp(24)},
    greyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: wp(15),
      backgroundColor: colors?.neutral100,
      borderRadius: wp(10),
    },
    avatar: {
      width: wp(50),
      height: wp(50),
      borderRadius: wp(25),
      marginRight: wp(15),
      backgroundColor: colors?.text300,
    },
    userInfo: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: wp(5),
      width: '71%',
    },
    primaryButton: {
      paddingVertical: wp(2),
      paddingHorizontal: wp(4),
      borderRadius: wp(5),
      backgroundColor: colors?.neutral50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: wp(12),
      color: colors?.text300,
    },
    navContainer: {
      width: '100%',
      flexDirection: 'row',
      gap: wp(16),
    },
    tabStyles: {
      marginRight: wp(5),
      paddingVertical: wp(8),
      paddingHorizontal: 8,
    },
    cardWrapper: {
      height: 'auto',
      width: '100%',
      padding: wp(15),
      backgroundColor: colors?.white,
      borderRadius: wp(10),
      overflow: 'hidden',
    },
    wrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: wp(16),
    },
    text: {
      fontSize: wp(16),
    },
    line: {
      height: wp(1),
      width: '70%',
      backgroundColor: colors?.neutral100,
    },

    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: wp(10),
      paddingHorizontal: wp(15),
      backgroundColor: colors?.white,
      borderRadius: wp(10),
    },
    iconContainer: {
      width: wp(40),
      height: wp(40),
      borderRadius: wp(20),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: wp(10),
    },
    buttonTextBolder: {
      flex: 1,
      fontSize: wp(16),
      color: colors?.black,
    },
    successButton: {
      backgroundColor: colors?.success600,
      width: '50%',
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      padding: wp(8),
      paddingHorizontal: wp(10),
      flexDirection: 'row',
      gap: wp(8),
      borderRadius: wp(8),
      alignSelf: 'flex-start',
    },
    floatingBtn: {
      position: 'absolute',
      bottom: wp(70),
      right: wp(25),
      zIndex: 1000,
      width: wp(118),
    },
    notesFloatingIcon: {
      position: 'absolute',
      bottom: wp(130),
      right: wp(25),
      zIndex: 1000,
      width: wp(118),
    },
  });

export const buttonStyles = ({
  colors,
  bg,
}: {
  colors?: ColorDefinitions;
  bg?: string;
}) =>
  StyleSheet.create({
    searchItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: bg || colors?.information50,
      paddingHorizontal: wp(15),
      borderRadius: wp(20),
    },
    closeButton: {
      marginLeft: wp(10),
    },
    buttonParent: {
      alignItems: 'flex-start',
      backgroundColor: colors?.white,
      borderWidth: 1,
      borderColor: colors?.neutral100,
      borderRadius: wp(10),
      paddingVertical: wp(8),
      paddingHorizontal: wp(12),
    },
  });
