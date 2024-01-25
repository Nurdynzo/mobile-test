import {PlusCircleIcon} from '@/assets/svg';
import {useColors} from '@/hooks/useColors';
import {detectTouch} from '@/resources/config';
import {SnowstormSimpleResponseDto} from '@/state/services/snowstorm';
import VoidFunction from '@/types/voidfunction';
import React, {ReactNode, useRef} from 'react';
import {ScrollView, TouchableOpacity, View, ViewStyle} from 'react-native';
import AllInputsPillButton from '../../buttons/all-inputs-pill-button';
import AppTextInput from '../app-text-input';
import {allInputsSuggestionsInputStyles} from './styles';

const AllInputsSuggestionsInput = ({
  suggestions = [],
  onRemoveItem = () => null,
  onPressPlusIcon,
  placeholder = 'Click predictive text or type here',
  textValue,
  marginBottom,
  onChangeText,
  disablePlusBtn,
  ActionBtnContent,
  showTextInput = true,
  extraBaseContainerStyle,
  showRightView = true,
}: {
  suggestions: SnowstormSimpleResponseDto[];
  placeholder?: string;
  label?: string;
  onPressPlusIcon: VoidFunction;
  ActionBtnContent?: ReactNode;
  onRemoveItem: (item: SnowstormSimpleResponseDto) => void;
  textValue?: string;
  marginBottom?: number;
  onChangeText?: (text: string) => void;
  disablePlusBtn?: boolean;
  showTextInput?: boolean;
  extraBaseContainerStyle?: ViewStyle;
  showRightView?: boolean;
}) => {
  const {colors} = useColors();
  const styles = allInputsSuggestionsInputStyles({colors, marginBottom});
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <>
      <View style={[styles.baseContainer, extraBaseContainerStyle]}>
        <View style={styles.textInputWrapper}>
          {showTextInput && (
            <AppTextInput
              value={textValue}
              onChangeText={onChangeText}
              multiline={true}
              inputContainerStyle={styles.inputContentContainer}
              inputStyle={styles.textInput}
              placeholder={placeholder}
            />
          )}

          <ScrollView
            ref={scrollViewRef}
            nestedScrollEnabled
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
            overScrollMode="never">
            <View style={styles.selectedSuggestionsContainer}>
              {suggestions.map((item, index) => (
                <AllInputsPillButton
                  key={index}
                  text={item.name as string}
                  isSelected
                  onPress={() => onRemoveItem(item)}
                  borderWidth={0}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        {showRightView && (
          <View style={styles.actionsBtnContainer}>
            <TouchableOpacity
              hitSlop={detectTouch}
              disabled={disablePlusBtn}
              onPress={onPressPlusIcon}>
              {
                <PlusCircleIcon
                  fill={colors?.[!disablePlusBtn ? 'primary400' : 'text50']}
                />
              }
            </TouchableOpacity>
            {ActionBtnContent}
          </View>
        )}
      </View>
    </>
  );
};

export default AllInputsSuggestionsInput;
