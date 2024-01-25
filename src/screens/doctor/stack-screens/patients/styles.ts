import {StyleSheet} from 'react-native';
import {ColorDefinitions} from '../../../../resources/colors';
import {wp} from '@/resources/config';

export const doctorPatientStyle = ({
  colors,
  cardHeaderHasBackground,
}: {
  containerWidth?: number;
  colors?: ColorDefinitions;
  cardHeaderHasBackground?: boolean;
}) =>
  StyleSheet.create({
    tabButton: {width: undefined, paddingHorizontal: 16},
    header: {
      paddingHorizontal: wp(24),
      backgroundColor: colors?.default400,
    },
    container: {
      borderRadius: wp(32),
      backgroundColor: 'white',
      width: wp(300),
      height: wp(40),
      padding: wp(4),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: wp(12),
      marginBottom: wp(16),
    },
    innerViewCommon: {
      borderRadius: wp(23),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // card header
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
  });

export const profileStyles = ({colors}: {colors?: ColorDefinitions}) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: colors?.default300,
      borderRadius: 10,
    },
    greyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: colors?.neutral100,
      borderRadius: 10,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
      backgroundColor: colors?.text300,
    },
    userInfo: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 5,
      width: '71%',
    },
    primaryButton: {
      paddingVertical: 2,
      paddingHorizontal: 4,
      borderRadius: 5,
      backgroundColor: colors?.neutral50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 12,
      color: colors?.text300,
    },
    navCenteredText: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: '75%',
      marginTop: 5,
    },
    navContainer: {
      width: '100%',
      flexDirection: 'row',
      gap: 16,
    },
    tabStyles: {
      marginRight: 5,
      paddingVertical: 8,
      paddingHorizontal: 8,
    },
    cardWrapper: {
      height: 'auto',
      width: '100%',
      padding: 15,
      backgroundColor: colors?.white,
      borderRadius: 10,
      overflow: 'hidden',
    },
    wrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    text: {
      fontSize: 16,
    },
    line: {
      height: 1,
      width: '70%',
      backgroundColor: colors?.neutral100,
    },

    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: colors?.white,
      borderRadius: 10,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    iconContainerBackground: {
      backgroundColor: colors?.default300,
    },
    buttonTextBolder: {
      flex: 1,
      fontSize: 16,
      color: colors?.black,
    },
    //call button
    successButton: {
      backgroundColor: colors?.success600,
      width: '50%',
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      padding: 8,
      paddingHorizontal: 10,
      flexDirection: 'row',
      gap: 8,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    marginLeft12: {
      marginLeft: 12,
    },
  });
