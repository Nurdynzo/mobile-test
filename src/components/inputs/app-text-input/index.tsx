import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, TextInput} from 'react-native';
import {EyeClosedIcon, OpenEyeIcon} from '@/assets/svg';
import {useColors} from '@/hooks/useColors';
import AppText from '../../common/app-text';
import {appTextInputStyles} from './styles';
import {appTextInputTypes} from './type';
import {useAppInput} from './useAppInput';

const AppTextInput = ({
  value,
  onChangeText,
  multiline,
  onBlur = () => null,
  onFocus = () => null,
  onPressIn = () => null,
  editable,
  autoFocus,
  placeholder = 'placeholder',
  keyboardType = 'default',
  label,
  isPassword,
  iconOnPress,
  rightIcon,
  onPressRightIcon,
  LeftContent,
  RightContent,
  textContentType,
  height,
  numberOfLines,
  baseContainerStyle,
  inputStyle,
  showRequiredTag = false,
  inputContainerStyle,
}: appTextInputTypes) => {
  const {setIsFocused, secureText, setSecureText, isFocused} = useAppInput();

  const {colors} = useColors();

  const styles = appTextInputStyles({colors, isFocused, height, multiline});

  return (
    <View style={baseContainerStyle}>
      {label && (
        <AppText
          color={'text300'}
          text={[
            label,
            showRequiredTag && <AppText key={0} text={'*'} color={'text400'} />,
          ]}
          style={styles.label}
        />
      )}
      <View style={[styles.container, inputContainerStyle]}>
        {LeftContent}
        <TextInput
          keyboardType={keyboardType}
          placeholderTextColor={colors.text50}
          autoCapitalize="none"
          value={value}
          textContentType={textContentType}
          onChangeText={onChangeText}
          multiline={multiline}
          allowFontScaling={false}
          onFocus={() => {
            setIsFocused(true);
            onBlur();
          }}
          onBlur={() => {
            setIsFocused(false);
            onFocus();
          }}
          onPressIn={onPressIn}
          editable={editable}
          autoFocus={autoFocus}
          placeholder={placeholder}
          style={[styles.input, inputStyle]}
          secureTextEntry={secureText && isPassword}
          numberOfLines={numberOfLines}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onPressRightIcon}>
            {rightIcon}
          </TouchableOpacity>
        )}

        {isPassword && !iconOnPress ? (
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            {!secureText && isPassword ? <EyeClosedIcon /> : <OpenEyeIcon />}
          </TouchableOpacity>
        ) : (
          RightContent
        )}
      </View>
    </View>
  );
};

export default AppTextInput;
