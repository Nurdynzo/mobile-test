import {StyleSheet} from 'react-native';
import {ColorDefinitions, ColorKeys} from '../../../resources/colors';

export const nextOfKinCardStyles = ({
  colors,
}: {
  colors: ColorDefinitions;
  bg?: ColorKeys;
  cardHeaderHasBackground?: boolean;
}) =>
  StyleSheet.create({
    container: {
      gap: 16,
      backgroundColor: colors.neutral25,
      padding: 12,
      borderRadius: 10,
    },
  });
