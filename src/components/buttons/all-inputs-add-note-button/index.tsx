import useAddNoteButton from '@/hooks/useAddNoteButton';
import {AddNotesButtonState} from '@/types/addNoteButtonState';
import {View, ViewStyle} from 'react-native';
import AppTextInput from '../../inputs/app-text-input';
import {useColors} from '@/hooks/useColors';
import React from 'react';
import RoundedCloseButton from '../round-close-button';
import AllInputsPlusButton from '../all-inputs-plus-button';
import {wp} from '@/resources/config';
import {allInputsAddNotesButtonStyles} from './styles';

const AllInputsAddNotesButton = ({
  addButtonLabel,
  buttonState,
  buttonStyle,
}: {
  addButtonLabel: string;
  inputViewLabel?: string;
  buttonStyle?: ViewStyle;
  buttonState: ReturnType<typeof useAddNoteButton>;
}) => {
  const {colors} = useColors();
  const styles = allInputsAddNotesButtonStyles();

  return buttonState.state === AddNotesButtonState.open ? (
    <View style={{gap: wp(8)}}>
      <RoundedCloseButton
        onClose={buttonState.onClose}
        style={styles.closeButton}
      />
      <AppTextInput
        height={80}
        multiline
        placeholder={'Type your notes here'}
        borderColor={colors.neutral100}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
      />
    </View>
  ) : (
    <AllInputsPlusButton
      text={addButtonLabel}
      onPress={buttonState.onOpen}
      buttonStyle={[styles.buttonStyle, buttonStyle]}
    />
  );
};

export default AllInputsAddNotesButton;
