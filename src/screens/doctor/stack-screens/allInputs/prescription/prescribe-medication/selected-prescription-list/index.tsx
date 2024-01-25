import React from 'react';
import {View, Pressable} from 'react-native';
import {AppText} from '@/components/common';
import {ArrowRightIcon, MoreVerticalIcon} from '@/assets/svg';
import AppSpacer from '@/components/spacer/AppSpacer';
import {AppMenuSheet} from '@/components/sheets';
import {prescriptionMenuOptions} from '@/constants/prescription';
import {allInputStyles} from '@/screens/doctor/stack-screens/allInputs/styles';
import {useColors} from '@/hooks/useColors';
import {SelectedPrescriptionListType} from '@/screens/doctor/stack-screens/allInputs/prescription/types';

export function SelectedPrescriptionList({
  item,
  openEditSelectedPrescriptionSheet,
  editSelectedPrescriptionSheet,
  setPrescription,
  prescriptionState,
  setPrescriptionState,
  index,
}: SelectedPrescriptionListType) {
  const {colors} = useColors();
  const styles = allInputStyles({colors});
  return (
    <View>
      <View style={styles.rowSpaceBetween}>
        <AppText
          text={`${item?.activePills[0]?.obj?.productName}, ${item?.activePills[0]?.obj?.doseForm}, ${item?.dosage?.value} ${item?.dosage?.label} ${item?.frequency?.value} ${item?.frequency?.label} ${item?.duration?.value} ${item?.duration?.label}, ${item?.direction?.value}`}
        />
        <Pressable onPress={() => openEditSelectedPrescriptionSheet()}>
          <MoreVerticalIcon />
        </Pressable>
      </View>
      <AppSpacer direction="top" />
      <AppMenuSheet
        title=""
        sheetRef={editSelectedPrescriptionSheet}
        menuOptions={prescriptionMenuOptions}
        renderRightIcon={() => <ArrowRightIcon />}
        showSearchInput={false}
        onSelectItem={value => {
          if (value.item === 'Edit') {
            setPrescription(prescriptionState[index]);
            const newStates = prescriptionState.filter((_, i) => i !== index);
            setPrescriptionState(newStates);
          }
          if (value.item === 'Remove') {
            const newStates = prescriptionState?.filter((_, i) => i !== index);
            setPrescriptionState(newStates);
          }
        }}
      />
    </View>
  );
}
