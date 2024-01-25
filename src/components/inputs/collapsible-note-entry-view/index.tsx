import {useState} from 'react';
import React from 'react';
import AllInputsClosedPanelButton from '@/components/buttons/all-inputs-closed-panel-button';
import {View, TouchableOpacity} from 'react-native';
import AppTextInput from '../app-text-input';
import AppText from '@/components/common/app-text';
import {ArrowUpIcon} from '@/assets/svg';
import {useColors} from '@/hooks/useColors';
import {collapsibleNotEntryViewStyles} from './styles';

const CollapsibleNoteEntryView = ({
  name,
  marginTop = 16,
}: {
  name: string;
  marginTop?: number;
}) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      {isOpen ? (
        <OpenedPanel
          marginTop={marginTop}
          name={name}
          onClose={() => {
            setOpen(false);
          }}
        />
      ) : (
        <AllInputsClosedPanelButton
          height={62}
          marginTop={marginTop}
          text={name}
          onPress={() => {
            setOpen(true);
          }}
        />
      )}
    </>
  );
};

const OpenedPanel = ({
  name,
  onClose,
  marginTop,
}: {
  name: string;
  onClose: () => void;
  marginTop: number;
}) => {
  const {colors} = useColors();
  const style = collapsibleNotEntryViewStyles({colors, marginTop});

  return (
    <View style={style.openedPanelContainer}>
      <OpenedPanelCloseButton name={name} onClose={onClose} />
      <AppTextInput
        multiline
        placeholder="Type your notes here"
        inputContainerStyle={style.openedPanelInputContainer}
        inputStyle={style.openedPanelInput}
        height={265}
      />
    </View>
  );
};

const OpenedPanelCloseButton = ({
  onClose,
  name,
}: {
  name: string;
  onClose: () => void;
}) => {
  const {colors} = useColors();
  const style = collapsibleNotEntryViewStyles({colors});
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onClose}
      style={style.openedPanelClosedButton}>
      <AppText
        color={'text400'}
        type={'body_1_semibold'}
        text={name}
        align={'center'}
      />
      <ArrowUpIcon stroke={colors.text400} />
    </TouchableOpacity>
  );
};

export default CollapsibleNoteEntryView;
