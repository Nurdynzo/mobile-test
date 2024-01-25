import {StyleSheet} from 'react-native';
import {ColorDefinitions} from '../../resources/colors';
import {SCREEN_HEIGHT} from '../../resources/config';

export const searchPatientResultContainerStyles = ({
  colors,
  hasResults,
}: {
  colors: ColorDefinitions;
  hasResults?: boolean;
}) =>
  StyleSheet.create({
    gap: {
      gap: 7,
    },
    resultsContainer: {
      borderRadius: 10,
      overflow: 'hidden',
      maxHeight: SCREEN_HEIGHT / 2,
      backgroundColor: colors?.white,
      paddingVertical: hasResults ? 5 : 0,
    },
  });
