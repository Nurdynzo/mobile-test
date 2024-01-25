import {BinIcon, RightCaretIcon} from '@/assets/svg';
import AllInputsHistoryListView from '@/components/all-inputs-history-list-view';
import AllInputsHistoryTile from '@/components/all-inputs-history-tile';
import {AppButton} from '@/components/buttons';
import PatientInfoCard from '@/components/cards/Patients/patient-info-card';
import {AppRow, AppText} from '@/components/common';
import {
  AppDateTimeInput,
  AppSelectInput,
  AppTextInput,
  AppToggleSwitch,
} from '@/components/inputs';
import SelectWithLeftValue from '@/components/inputs/select-with-left-value';
import {AppContentSheet} from '@/components/sheets';
import AppSelectItemSheet from '@/components/sheets/app-select-item-sheet';
import {procedureLocation, summaryMenuForRequest} from '@/constants/procedures';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import VoidFunction from '@/types/voidfunction';
import {ListRenderItem, ListRenderItemInfo} from '@shopify/flash-list';
import React from 'react';
import {View} from 'react-native';
import {proceduresStyles} from '../../styles';
import {TitlesforRequestsTypes} from '../../types';

const RequestProceduresSummaryView = () => {
  const {closeSheet, openSheet, sheetRef} = useSheet();
  const {
    openSheet: openSpecializedProceduresSheet,
    sheetRef: specializedProceduresSheet,
  } = useSheet();
  const {
    openSheet: openScheduleProceduresSheet,
    sheetRef: scheduleProceduresSheet,
  } = useSheet();

  const {colors} = useColors();
  const styles = proceduresStyles({colors});

  const handleItem = (value: TitlesforRequestsTypes) => {
    switch (value) {
      case 'Mark as specialized procedure':
        return openSpecializedProceduresSheet();
      case 'Schedule procedure':
        return openScheduleProceduresSheet();

      default:
        return;
    }
  };

  return (
    <>
      <HistoryView
        renderItem={props => (
          <HistoryRenderItem {...props} openSheet={openSheet} />
        )}
      />
      <AppSelectItemSheet
        removeHeader
        sheetRef={sheetRef}
        selectOptions={summaryMenuForRequest}
        renderRightIcon={({item}) =>
          item?.item?.value?.toLowerCase() === 'delete' ? (
            <BinIcon fill={colors.danger100} />
          ) : (
            <RightCaretIcon stroke={colors.text400} />
          )
        }
        onSelectItem={({item}) => {
          handleItem(item.value as TitlesforRequestsTypes);
          closeSheet();
        }}
      />
      <AppContentSheet
        adjustToContentHeight={false}
        isScrollable
        sheetRef={specializedProceduresSheet}
        headerTitle="Mark a specialized procedure">
        <View style={styles.sheetContainer}>
          <PatientInfoCard
            fullName={'Zucci Daniel'}
            code={'4343'}
            dateOfBirth={'2023-08-25T10:15:30.000Z'}
            gender={'Male'}
          />
          <AppSelectInput
            label={'Procedure(s)'}
            placeholder="Laparatomy, Prostatectomy"
          />
          <AppRow>
            <AppText
              type="body_1_medium"
              color="text300"
              text="Requires an Anaesthetist?"
              style={{flex: 1}}
            />
            <AppToggleSwitch isOn={true} />
          </AppRow>
          <AppTextInput label="Anaesthetist" placeholder="Dr Oyetunde" />
          <AppRow>
            <AppText
              type="body_1_medium"
              color="text300"
              text="Are the procedures in the same session"
              style={{flex: 1}}
            />
            <AppToggleSwitch isOn={true} />
          </AppRow>
          <AppText
            type="subtitle_semibold"
            text="Procedure details: Laparatomy"
          />
          <SelectWithLeftValue
            leftValue="8"
            label="Duration of the procedure"
            placeholder="hours"
            selectOptions={[{item: {id: 1, value: '1'}}]}
          />
          <AppSelectInput
            label="Location of the procedure"
            placeholder="Select location"
          />
          <AppDateTimeInput
            mode={'date'}
            label="Proposed date"
            extraFontStyle={{fontSize: 12}}
            placeholder="12 Nov 2023"
          />
          <AppDateTimeInput
            mode={'time'}
            label="Proposed time"
            extraFontStyle={{fontSize: 12}}
            placeholder="10:00AM"
          />
        </View>
      </AppContentSheet>
      <AppContentSheet
        isScrollable
        sheetRef={scheduleProceduresSheet}
        headerTitle="Schedule procedure">
        <View style={styles.sheetContainer}>
          <PatientInfoCard
            fullName={'Zucci Daniel'}
            code={'4343'}
            dateOfBirth={'2023-08-25T10:15:30.000Z'}
            gender={'Male'}
          />
          <AppSelectInput label="Procedure(s)" />
          <AppRow>
            <AppText
              type="body_1_medium"
              color="text300"
              text="Are the procedures in the same session"
              style={{flex: 1}}
            />
            <AppToggleSwitch isOn={true} />
          </AppRow>
          <AppText
            type="subtitle_semibold"
            text="Procedure details: Laparatomy, Prostatectomy"
          />
          <AppSelectInput
            label="Location of the procedure"
            placeholder="Select location"
            selectOptions={procedureLocation}
          />
          <AppDateTimeInput
            mode={'date'}
            label="Proposed date"
            extraFontStyle={{fontSize: 12}}
            placeholder="12 Nov 2023"
          />
          <AppDateTimeInput
            mode={'time'}
            label="Proposed time"
            extraFontStyle={{fontSize: 12}}
            placeholder="10:00AM"
          />
          <AppButton
            width={80}
            text="Save"
            containerStyle={{alignSelf: 'flex-end'}}
          />
        </View>
      </AppContentSheet>
    </>
  );
};

const HistoryView = ({renderItem}: {renderItem: ListRenderItem<number>}) => {
  return (
    <AllInputsHistoryListView
      // TODO(Zucci): This is temporal and would be removed during integration
      data={[1, 2, 3, 4, 5, 6, 7]}
      renderItem={renderItem}
    />
  );
};

const HistoryRenderItem = ({
  index,
  openSheet = () => null,
}: ListRenderItemInfo<number> & {openSheet: VoidFunction}) => {
  return <HistoryTile key={index} openSheet={openSheet} />;
};

const HistoryTile = ({openSheet}: {openSheet: VoidFunction}) => {
  return (
    <AllInputsHistoryTile
      time={'9:00AM'}
      date={'Today'}
      onPress={openSheet}
      textComponent={
        <AppText
          type={'body_2_semibold'}
          text={[
            <AppText key={0} text={'Abdominal pain'} type={'body_2_bold'} />,
            ' - umbilical region; began 3 weeks ago; characterized as dull, piercing, not described as persistent, throbbing; radiates to the chest part, does not radiate to the groin area; associated with nausea, no history of garbled speech; lasts for 3 hours at night; exacerbated by eating much, relieved by resting; described as 6 on a 0 - 10 scale',
          ]}
        />
      }
    />
  );
};

export default RequestProceduresSummaryView;
