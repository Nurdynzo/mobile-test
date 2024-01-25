import {
  PlusCircleIcon,
  SelectedCheckBoxIcon,
  UnSelectedCheckBoxIcon,
} from '@/assets/svg';
import {AppIconButton} from '@/components/buttons';
import AppSelectItemSheet from '@/components/sheets/app-select-item-sheet';
import {suggestedVitals} from '@/constants/vitalSigns';
import {useColors} from '@/hooks/useColors';
import {wp} from '@/resources/config';
import React from 'react';
import {SelectedProps} from '../../type';
import {useVitalSigns} from '../../useVitalSigns';
import {useAddVitalSigns} from './useAddVitalSigns';

const AddVitalSignsButton = () => {
  const {addVitalSignSheet, openAddVitalSignSheet} = useAddVitalSigns();

  const {vitals, handleOnSelectItem, checkIfItemIsSelected} = useVitalSigns();

  const {colors} = useColors();
  return (
    <>
      <AppIconButton
        onPress={openAddVitalSignSheet}
        height={32}
        icon={<PlusCircleIcon fill={colors.primary400} />}
      />

      <AppSelectItemSheet
        title="Add vitals to list"
        showSearchInput
        searchPlaceholder="Search Vital signs"
        sheetRef={addVitalSignSheet}
        selectOptions={suggestedVitals}
        selectedValue={vitals.spo2?.value ?? ''}
        renderRightIcon={({isSelected}) =>
          isSelected ? (
            <SelectedCheckBoxIcon height={wp(20)} width={wp(20)} />
          ) : (
            <UnSelectedCheckBoxIcon />
          )
        }
        onSelectItem={({item}) => {
          handleOnSelectItem(item as SelectedProps);
        }}
        isMultiSelect
        isOptionSelected={option => {
          return checkIfItemIsSelected(option.item as SelectedProps) as boolean;
        }}
      />
    </>
  );
};

export default AddVitalSignsButton;
