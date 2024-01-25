import {
  DownCaretIcon,
  PlusCircleIcon,
  SelectedCheckBoxIcon,
  UnSelectedCheckBoxIcon,
} from '@/assets/svg';
import {AppButton, AppIconButton} from '@/components/buttons';
import {AppTextInput} from '@/components/inputs';
import {AppContentSheet} from '@/components/sheets';
import AppSelectItemSheet from '@/components/sheets/app-select-item-sheet';
import {
  allVitals,
  moreVitalsTitle as moreVitalSignsTitle,
  moreVitalsArray,
} from '@/constants/vitalSigns';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import {wp} from '@/resources/config';
import {EMPTY_STRING} from '@/utils/constants';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {vitalSignsStyles} from '../../styles';
import {SelectedProps} from '../../type';
import {useVitalSigns} from '../../useVitalSigns';
import VitalSignsNumericInput from '../vital-signs-numeric-input';
import {MoreVitalSignsItemProps} from './type';

const SearchVitalSigns = () => {
  const {colors} = useColors();
  const styles = vitalSignsStyles({colors});

  const {sheetRef: allVitalSignSheet, openSheet: openAllVitalSignSheet} =
    useSheet();

  const {sheetRef: takeVitalSignSheet, openSheet: openTakeVitalSignSheet} =
    useSheet();

  const {vitals, handleOnSelectItem, checkIfItemIsSelected} = useVitalSigns();

  return (
    <>
      <AppTextInput
        editable={false}
        placeholder="Search Vital signs"
        value={EMPTY_STRING}
        rightIcon={
          <TouchableOpacity onPress={openAllVitalSignSheet}>
            <DownCaretIcon stroke={colors.text50} />
          </TouchableOpacity>
        }
      />

      <AppSelectItemSheet
        showSearchInput
        searchPlaceholder="Search Vital signs"
        sheetRef={allVitalSignSheet}
        selectOptions={allVitals}
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
        flatlistProps={{
          ListFooterComponent: (
            <View style={styles.buttonWrapper}>
              <AppButton
                onPress={openTakeVitalSignSheet}
                containerStyle={[styles.save, {width: wp(120)}]}
                text="Check GCS"
              />
            </View>
          ),
        }}
      />

      <AppContentSheet
        headerTitle="Take vital signs"
        sheetRef={takeVitalSignSheet}>
        <View style={styles.takeContainer}>
          {moreVitalsArray.map((item, index: number) => (
            <MoreVitalSignsItem
              key={index}
              item={item}
              openHeartRateSheet={() => null}
              colors={colors}
              index={index}
            />
          ))}
          <AppButton
            onPress={openTakeVitalSignSheet}
            text="Save"
            containerStyle={[styles.save, {width: wp(80)}]}
          />
        </View>
      </AppContentSheet>
    </>
  );
};

const MoreVitalSignsItem = ({
  item,
  openHeartRateSheet,
  colors,
  index,
}: MoreVitalSignsItemProps) => {
  const {
    name,
    title,
    value,
    customContent,
    hasBorder,
    onPressDropDown,
    customRightContent,
  } = item;

  const handleActions = (title: moreVitalSignsTitle) => {
    switch (title) {
      case 'MUAC':
        return openHeartRateSheet();
      case 'Fetal heart rate':
        return openHeartRateSheet();
      default:
        return () => onPressDropDown;
    }
  };

  return (
    <VitalSignsNumericInput
      title={title}
      name={name}
      value={value}
      hasToggle={true}
      hasDropDown={false}
      customRightContent={
        title === 'Fetal heart rate' ? (
          <>
            <AppIconButton
              height={32}
              onPress={() => null}
              icon={<PlusCircleIcon fill={colors.primary400} />}
            />
          </>
        ) : (
          customRightContent
        )
      }
      hasBorder={hasBorder}
      key={index}
      onPressDropDown={() => handleActions(title)}
      getCount={count => count}
      customContent={customContent}
    />
  );
};

export default SearchVitalSigns;
