import React, {FunctionComponent} from 'react';
import {View, TouchableOpacity, Animated, ViewStyle} from 'react-native';
import {useColors} from '../../../hooks/useColors';
import AppText from '../../common/app-text';
import {calculateDimensions, toggleSwitchStyles} from './styles';
import {ToggleSwitchProps} from './type';
import {useToogleSwitchAnimation} from './useToogleSwitchAnimation';

const AppToggleSwitch: FunctionComponent<ToggleSwitchProps> = ({
  isOn,
  label,
  labelColor = 'text300',
  labelTyle = 'body_1_medium',
  labelPosition = 'left',
  onColor = 'primary400',
  offColor = 'neutral25',
  size = 'medium',
  labelStyle = {},
  thumbOnStyle = {},
  thumbOffStyle = {},
  trackOnStyle = {},
  trackOffStyle = {},
  onToggle,
  icon,
  disabled = false,
  animationSpeed = 300,
  useNativeDriver = true,
  circleColor = 'white',
  hitSlop,
}) => {
  const dimensions = calculateDimensions(size);

  const {colors} = useColors();

  const {_handleToggleSwitch, offsetX} = useToogleSwitchAnimation({
    isOn,
    animationSpeed,
    dimensions,
    onToggle,
    useNativeDriver,
  });

  const styles = toggleSwitchStyles({
    dimensions,
    toggleSwitchBgColor: colors[isOn ? onColor : offColor],
    circleColor,
    offsetX,
  });

  const createToggleSwitchStyle: Array<ViewStyle | ViewStyle[]> = [
    styles.toggleSwitch,
    isOn ? trackOnStyle : trackOffStyle,
  ];

  const createInsideCircleStyle: Array<ViewStyle | ViewStyle[]> = [
    styles.insideCircle,
    isOn ? thumbOnStyle : thumbOffStyle,
  ];

  return (
    <View style={styles.container}>
      {label && labelPosition === 'left' ? (
        <AppText
          text={label}
          type={labelTyle}
          color={labelColor}
          style={[styles.label, labelStyle]}
        />
      ) : null}
      <TouchableOpacity
        style={createToggleSwitchStyle}
        activeOpacity={0.8}
        hitSlop={hitSlop}
        disabled={disabled}
        onPress={_handleToggleSwitch}>
        <Animated.View style={createInsideCircleStyle}>{icon}</Animated.View>
      </TouchableOpacity>
      {label && labelPosition === 'right' ? (
        <AppText
          text={label}
          type={labelTyle}
          color={labelColor}
          style={[styles.label, labelStyle]}
        />
      ) : null}
    </View>
  );
};

export default AppToggleSwitch;
