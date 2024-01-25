import {View} from 'react-native';
import {alertBubbleIconWrapperStyles} from './styles';
import React from 'react';
import {useColors} from '@/hooks/useColors';

/**
 * A component that serves as the circular base container
 * for an icon passed to an AnimatedBubble component,
 * see NextOfKinDetailsView, Insurance history et al for usage
 *
 * @param icon icon to be wrapped
 */
const AlertBubbleIconWrapper = ({icon}: {icon: JSX.Element}) => {
  const {colors} = useColors();
  const styles = alertBubbleIconWrapperStyles(colors);
  return <View style={styles.container}>{icon}</View>;
};

export default AlertBubbleIconWrapper;
