import {
  DownCaretIcon,
  RadioBtnEmptyIcon,
  RadioBtnFilledIcon,
} from '@/assets/svg';
import {AppTouchButton} from '@/components/buttons';
import {AllInputsPanelWithTitleCard} from '@/components/cards';
import {AppRow, AppText} from '@/components/common';
import {
  AppDateTimeInput,
  AppTextInput,
  AppToggleSwitch,
} from '@/components/inputs';
import {AppMenuSheet} from '@/components/sheets';
import {ScrollableTab} from '@/components/tabs';
import AppTabSwitcher from '@/components/tabs/tabs-switcher';
import {
  filterOptions,
  nationalImmunizationDurationsDurations,
} from '@/constants/vaccination';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import {fs, wp} from '@/resources/config';
import {GetPatientDetailsOutDto} from '@/state/services/patientApi';
import {useApiServicesAppVaccineGetallGetQuery} from '@/state/services/vaccineApi';
import {EMPTY_STRING} from '@/utils/constants';
import React, {useState} from 'react';
import {View} from 'react-native';
import RecordVaccination from './common/record-vaccination';
import VaccinationHistoryView from './common/vaccination-history-view';

export const Vaccination = ({
  patientDetails,
}: {
  patientDetails: GetPatientDetailsOutDto;
}) => {
  const {colors} = useColors();

  const [currentTab, setCurrentTab] = useState<number | null>(0);
  const [noHistory, setNoHistory] = useState(false);

  const {
    closeSheet: closeNationalImmunizationFilterSheet,
    openSheet: openNationalImmunizationFilterSheet,
    sheetRef: nationalImmunizationFilterSheet,
  } = useSheet();
  const [filterNationalImmunizationBy, setFilterNationalImmunizationBy] =
    useState<'By due date' | 'By vaccine'>('By due date');

  const [currentVaccinationTab, setCurrentVaccinationTab] = useState(0);

  const {data: apiVaccines} = useApiServicesAppVaccineGetallGetQuery();

  const nationalImmunizationDurationsVaccines = apiVaccines?.map(
    item => item.name,
  );

  //TODO(Zucci): No nexted component, when immunization comes in, refactor this.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderFormForImmunization = (vaccine: string) => {
    switch (vaccine?.toLowerCase()) {
      case 'national immunization schedule':
        return (
          <>
            <AppTouchButton
              extraStyles={{alignSelf: 'flex-start'}}
              onPress={openNationalImmunizationFilterSheet}
              text={filterNationalImmunizationBy}
              rightIcon={<DownCaretIcon stroke={colors.text400} />}
            />
            <ScrollableTab
              // TODO(Zucci): fix this
              tabs={
                filterNationalImmunizationBy === 'By due date'
                  ? nationalImmunizationDurationsDurations
                  : nationalImmunizationDurationsVaccines
              }
              currentIndex={currentTab}
              activeColor={{background: 'default300'}}
              unActiveColor={{background: 'neutral100'}}
              onPress={index =>
                setCurrentTab(currentTab !== index ? index : null)
              }
              style={{paddingVertical: wp(10)}}
            />
            <AppText
              type="subtitle_semibold"
              text={'BCG'}
              style={{fontSize: fs(14)}}
            />
            <DoseForm showTitle={false} />
            <DoseForm />
            <AppMenuSheet
              removeHeader
              sheetRef={nationalImmunizationFilterSheet}
              renderRightIcon={({isSelected}) =>
                isSelected ? <RadioBtnFilledIcon /> : <RadioBtnEmptyIcon />
              }
              selectedValue={filterNationalImmunizationBy}
              // TODO(Zucci): fix this
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              menuOptions={filterOptions as any}
              onSelectItem={({item}) => {
                setFilterNationalImmunizationBy(
                  item as 'By due date' | 'By vaccine',
                );
                closeNationalImmunizationFilterSheet();
              }}
            />
          </>
        );

      default:
        <></>;
    }
  };

  return (
    <>
      <AllInputsPanelWithTitleCard title={'Vaccination'}>
        <View style={{gap: wp(16)}}>
          <AppTabSwitcher
            hasFlex={false}
            tabs={[{name: 'Record vaccinations'}, {name: 'History'}]}
            onChangeTab={index => setCurrentVaccinationTab(index)}
            selectedIndex={currentVaccinationTab}
          />
          {currentVaccinationTab === 0 && (
            <RecordVaccination patientDetails={patientDetails} />
          )}
          {currentVaccinationTab === 1 && (
            <>
              <AppRow>
                <AppText
                  type="body_1_medium"
                  color="text300"
                  text="No history of vaccination"
                />
                <AppToggleSwitch isOn={noHistory} onToggle={setNoHistory} />
              </AppRow>
              {!noHistory && (
                <VaccinationHistoryView patientDetails={patientDetails} />
              )}
            </>
          )}
        </View>
      </AllInputsPanelWithTitleCard>
    </>
  );
};

const DoseForm = ({showTitle = true}: {showTitle?: boolean}) => {
  return (
    <>
      {showTitle && (
        <AppText
          type="subtitle_semibold"
          text={'Vaccine [dose number]'}
          style={{fontSize: fs(14)}}
        />
      )}
      <AppDateTimeInput
        mode={'date'}
        label="Due at birth or soon as possible till one year"
        extraFontStyle={{fontSize: fs(12)}}
        placeholder="12 Nov 2023"
      />
      <AppRow>
        <AppText type="body_1_medium" color="text300" text="Administered" />
        <AppToggleSwitch isOn={true} />
      </AppRow>
      <AppDateTimeInput
        mode={'date'}
        label="Date administered"
        extraFontStyle={{fontSize: fs(12)}}
        placeholder="12 Nov 2023"
      />
      <AppRow>
        <AppText
          type="body_1_medium"
          color="text300"
          text="Complications experienced"
        />
        <AppToggleSwitch isOn={true} />
      </AppRow>

      <AppTextInput label="Brand" placeholder="Enter brand" />

      <AppTextInput label="Batch number" placeholder="Enter batch number" />

      <AppTextInput
        placeholder="Add notes"
        height={80}
        value={EMPTY_STRING}
        multiline
      />
    </>
  );
};
