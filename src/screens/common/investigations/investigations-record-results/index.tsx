import {BinIcon, CalenderIcon, ClockIcon, RightCaretIcon} from '@/assets/svg';
import AllInputsHistoryTile from '@/components/all-inputs-history-tile';
import AllInputsSuggestionsContainer from '@/components/all-inputs-suggestions-container';
import {AllInputsPillButton, AppButton} from '@/components/buttons';
import AllInputsStatusButton from '@/components/buttons/all-inputs-status-button';
import {AppRow, AppText} from '@/components/common';
import {AllInputsSuggestionsInput, AppDateTimeInput} from '@/components/inputs';
import SignsNumericInput from '@/components/inputs/signs-numeric-input';
import AppSelectItemSheet from '@/components/sheets/app-select-item-sheet';
import SuggestionSelectionLeadingView from '@/components/suggestion-selection-leading-view';
import Pill from '@/components/tabs/pill';
import {summaryMenuForInvestigations} from '@/constants/investigations';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import {fs, wp} from '@/resources/config';
import {EMPTY_STRING} from '@/utils/constants';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {TitlesforRecordTypes} from '../../../doctor/stack-screens/allInputs/procedures/types';
import {investigationStyles} from '../styles';
import InvestigationCamera from '../view-investigations-upload-image';
import ViewInvestigationsUploadedImage from '../view-investigations-view-uploaded-image';

const InvestigationRecordResults = () => {
  const iconSize = wp(15);
  const {closeSheet, openSheet, sheetRef} = useSheet();

  const {colors} = useColors();
  const styles = investigationStyles({colors});
  const handleItem = (value: TitlesforRecordTypes) => {
    return value;
  };

  return (
    <>
      <AppRow extraStyles={styles.recentResultContainerHeader}>
        <AppText text={'Record results'} type={'title_semibold'} />
      </AppRow>
      <Pill text="Specimen" />
      <View style={{gap: wp(10)}}>
        <AppRow extraStyles={{gap: wp(10)}}>
          <InvestigationDateField
            label="Date of sample collection"
            placeholder="Select date"
            RightContent={
              <CalenderIcon
                fill={colors.text50}
                width={iconSize}
                height={iconSize}
              />
            }
          />
          <InvestigationDateField
            placeholder="Select time"
            label="Time of sample collection"
            RightContent={
              <ClockIcon
                fill={colors.text50}
                width={iconSize}
                height={iconSize}
              />
            }
          />
        </AppRow>
        <AppRow extraStyles={{gap: wp(10)}}>
          <InvestigationDateField
            placeholder="Select date"
            label="Date of result"
            RightContent={
              <CalenderIcon
                fill={colors.text50}
                width={iconSize}
                height={iconSize}
              />
            }
          />
          <InvestigationDateField
            placeholder="Select date"
            label="Time of result"
            RightContent={
              <ClockIcon
                fill={colors.text50}
                width={iconSize}
                height={iconSize}
              />
            }
          />
        </AppRow>
        <View>
          <AllInputsSuggestionsInput
            placeholder="Enter specimen"
            suggestions={[{id: EMPTY_STRING, name: 'Left flank'}]}
            onPressPlusIcon={() => {}}
            onRemoveItem={_ => {}}
          />
          <AllInputsSuggestionsContainer
            leadingComponent={
              <SuggestionSelectionLeadingView onTapExpand={() => {}} />
            }>
            {[{id: EMPTY_STRING, name: 'Left flank'}].map((item, index) => (
              <AllInputsPillButton
                key={index}
                text={item.name}
                isSelected
                onPress={() => {}}
              />
            ))}
          </AllInputsSuggestionsContainer>
        </View>
        <SignsContainer />
        <SignsContainer hasBottomBorder />
        <View style={{gap: wp(5)}}>
          <AppText
            text={'Conclusion'}
            color="text300"
            type={'label_semibold'}
          />
          <View>
            <AllInputsSuggestionsInput
              placeholder="Click predictive text or type text"
              suggestions={[{id: EMPTY_STRING, name: 'Left flank'}]}
              onPressPlusIcon={() => {}}
              onRemoveItem={_ => {}}
            />
            <AllInputsSuggestionsContainer
              leadingComponent={
                <SuggestionSelectionLeadingView onTapExpand={() => {}} />
              }>
              {[{id: EMPTY_STRING, name: 'Left flank'}].map((item, index) => (
                <AllInputsPillButton
                  key={index}
                  text={item.name}
                  isSelected
                  onPress={() => {}}
                />
              ))}
            </AllInputsSuggestionsContainer>
          </View>
        </View>
        <AppRow>
          <AppRow columnGap={5}>
            <InvestigationCamera />
            <AppText
              text={'0 images uploaded in total'}
              type={'body_1_semibold'}
              style={{fontSize: fs(14)}}
            />
          </AppRow>
          <ViewInvestigationsUploadedImage />
        </AppRow>
        <AppButton
          isDisabled
          text="Save"
          containerStyle={[styles.miniSaveBtn, {marginTop: wp(32)}]}
        />
        <AllInputsHistoryTile
          containerStyles={styles.borderTop}
          onPress={openSheet}
          time="Today"
          date="8:00AM"
          textComponent={
            <View style={{gap: wp(5)}}>
              <AppText
                key={0}
                text={'Full blood count (FBC) results'}
                type={'title_semibold'}
              />
              <AppText
                key={1}
                text={'Whole blood taken at 06:54 AM on 11 May 2022'}
                type={'body_1_medium'}
                color="text300"
                style={{fontSize: fs(14)}}
              />
              <AppText
                key={3}
                text={'Date and time of result: 09:32 AM, 13 May 2022'}
                type={'body_1_medium'}
                color="text300"
                style={{fontSize: fs(14)}}
              />
              <AppText
                key={4}
                text={'Red cell count: 1.28 x 1012/L'}
                type={'body_1_semibold'}
                style={{fontSize: fs(16)}}
              />
              <AllInputsStatusButton text="High" />
            </View>
          }
        />
      </View>
      <AppSelectItemSheet
        removeHeader
        sheetRef={sheetRef}
        selectOptions={summaryMenuForInvestigations}
        renderRightIcon={({item}) =>
          item?.item?.value?.toLowerCase() === 'delete' ? (
            <BinIcon fill={colors.danger100} />
          ) : (
            <RightCaretIcon stroke={colors.text400} />
          )
        }
        onSelectItem={({item}) => {
          handleItem(item.value as TitlesforRecordTypes);
          closeSheet();
        }}
      />
    </>
  );
};

export default InvestigationRecordResults;

export const InvestigationDateField = ({
  label,
  placeholder,
  RightContent,
}: {
  label: string;
  placeholder?: string;
  RightContent?: ReactNode;
}) => {
  return (
    <>
      <AppDateTimeInput
        labelStyles={{fontSize: fs(12)}}
        extraFontStyle={{fontSize: wp(12)}}
        label={label}
        placeholder={placeholder}
        RightContent={RightContent}
      />
    </>
  );
};

export const SignsContainer = ({
  hasBottomBorder = false,
}: {
  hasBottomBorder?: boolean;
}) => {
  const {colors} = useColors();
  const styles = investigationStyles({colors, hasBottomBorder});
  return (
    <>
      <View style={styles.signs}>
        <AppRow>
          <SignsNumericInput
            title={'Red cell count'}
            name={'x1012/L'}
            value={0}
            hasToggle={false}
            hasDropDown={false}
            hasBorder={false}
            getCount={count => count}
          />
        </AppRow>
        <AppRow>
          <SignsNumericInput
            title={'Range (Min)'}
            value={0}
            hasToggle={false}
            hasDropDown={false}
            hasBorder={false}
            getCount={count => count}
          />
          <SignsNumericInput
            title={'Range (Max)'}
            value={0}
            hasToggle={false}
            hasDropDown={false}
            hasBorder={false}
            getCount={count => count}
          />
        </AppRow>
      </View>
    </>
  );
};
