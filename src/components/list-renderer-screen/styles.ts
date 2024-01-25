import {StyleSheet} from 'react-native';
import {ColorDefinitions} from '../../resources/colors';

export const listRendererScreenStyles = ({
  colors,
}: {colors?: ColorDefinitions} = {}) =>
  StyleSheet.create({
    flex1: {flex: 1},
    screenBackground: {backgroundColor: colors?.default400},
    default: {paddingBottom: 200},
    gap: {height: 10, width: '100%'},
  });
