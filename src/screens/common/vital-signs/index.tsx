import {
  DownCaretIcon,
  RadioBtnEmptyIcon,
  RadioBtnFilledIcon,
} from '@/assets/svg';
import AppScreen from '@/components/app-screen';
import {showToast} from '@/components/app-toast';
import {AppButton} from '@/components/buttons';
import PatientInfoCard from '@/components/cards/Patients/patient-info-card';
import {AppRow, AppText} from '@/components/common';
import {AppHeader} from '@/components/headers';
import AppSelectItemSheet from '@/components/sheets/app-select-item-sheet';
import SliderInput from '@/components/slider-input';
import {
  heartRateOptions,
  heightOptions,
  spo2Options,
  temperatureOptions,
  vitalsArray,
} from '@/constants/vitalSigns';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import {wp} from '@/resources/config';
import React, {FunctionComponent, ReactNode} from 'react';
import {View} from 'react-native';
import AddVitalSignsButton from './common/add-vital-signs';
import CheckGcs from './common/check-gcs';
import Row from './common/row';
import SearchVitalSigns from './common/search-vital-signs';
import VitalSignsNumericInput from './common/vital-signs-numeric-input';
import {vitalSignsStyles} from './styles';
import {VitalTypes} from './type';
import {useVitalSigns} from './useVitalSigns';

const VitalSigns: FunctionComponent = () => {
  const {colors} = useColors();
  const styles = vitalSignsStyles({colors});
  const {updateVitals, vitals, painScale, setPainScale, openExtraMenuSheet} =
    useVitalSigns();

  const renderVitalsItem = (
    {
      name,
      title,
      value,
      hasToggle,
      hasDropDown,
      customContent,
      hasBorder,
      customRightContent,
    }: VitalTypes,
    index: number,
  ) => {
    const handleItem = () => {
      switch (title) {
        case 'Heart rate':
          return (
            <HeartRate
              title={title}
              name={name}
              value={value}
              hasToggle={hasToggle}
              hasDropDown={hasDropDown}
              key={index}
              customRightContent={customRightContent}
              updateVitals={item => updateVitals('heartRate', item)}
              selectedValue={vitals.heartRate?.value ?? ''}
              customContent={customContent}
              hasBorder={hasBorder}
              index={index}
            />
          );
        case 'Height':
          return (
            <HeightRate
              title={title}
              name={name}
              value={value}
              hasToggle={hasToggle}
              hasDropDown={hasDropDown}
              key={index}
              customRightContent={customRightContent}
              updateVitals={item => updateVitals('height', item)}
              selectedValue={vitals.height?.value ?? ''}
              customContent={customContent}
              hasBorder={hasBorder}
              index={index}
            />
          );
        case 'Temperature':
          return (
            <TemperatureRate
              title={title}
              name={name}
              value={value}
              hasToggle={hasToggle}
              hasDropDown={hasDropDown}
              key={index}
              customRightContent={customRightContent}
              updateVitals={item => updateVitals('temperature', item)}
              selectedValue={vitals.temperature?.value ?? ''}
              customContent={customContent}
              hasBorder={hasBorder}
              index={index}
            />
          );
        case 'SPO2':
          return (
            <SPO2Rate
              title={title}
              name={name}
              value={value}
              hasToggle={hasToggle}
              hasDropDown={hasDropDown}
              key={index}
              customRightContent={customRightContent}
              updateVitals={item => updateVitals('spo2', item)}
              selectedValue={vitals.spo2?.value ?? ''}
              customContent={customContent}
              hasBorder={hasBorder}
              index={index}
            />
          );
        default:
          return (
            <VitalSignsNumericInput
              title={title}
              name={name}
              value={value}
              hasToggle={hasToggle}
              hasDropDown={hasDropDown}
              customContent={
                title === 'GCS score' ? <CheckGcs /> : customContent
              }
              hasBorder={hasBorder}
              key={index}
              getCount={count => count}
              customRightContent={customRightContent}
            />
          );
      }
    };

    return handleItem();
  };

  return (
    <>
      <AppScreen
        ScreenHeader={
          <>
            <AppHeader middleTitle={'Vital signs'} />
            <View style={styles.topContent}>
              <PatientInfoCard
                dateOfBirth="2023-08-25T10:15:30.000Z"
                gender="Male"
                fullName="Caleb sign"
                code={4344}
                avatar={
                  'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_640.png'
                }
              />
              <SearchVitalSigns />
            </View>
          </>
        }>
        <View style={styles.container}>
          <View style={styles.content}>
            <AppRow extraStyles={styles.contentTitle}>
              <AppText
                type="title_semibold"
                color="text400"
                text={'Vital signs'}
              />
              <AddVitalSignsButton />
            </AppRow>
            <SliderInput
              title="Pain severity, on a scale of 0-10"
              number={painScale}
              getValue={setPainScale}
            />

            {vitalsArray.map((item, index: number) =>
              renderVitalsItem(item, index),
            )}
            <AppRow>
              <AppButton
                containerStyle={{width: wp(152)}}
                onPress={() => null}
                RightContent={<DownCaretIcon stroke={colors.primary400} />}
                text="Recheck vitals"
                buttonColor="transparent"
                borderColor="primary400"
                textColor="primary400"
              />
              <AppButton
                onPress={() =>
                  showToast('SUCCESS', {
                    title: 'Vital signs saved successfully',
                    message:
                      'Vital signs have been saved for this encounter successfully',
                  })
                }
                containerStyle={{width: wp(82)}}
                text="Saved"
              />
            </AppRow>
            <View style={styles.extra}>
              <Row
                time="9:00 am"
                date="today"
                showMore
                onPressMore={openExtraMenuSheet}
              />
              <Row isSmall textColor="danger300" />
              <Row isSmall />
              <Row isSmall />
            </View>
          </View>
        </View>
      </AppScreen>
    </>
  );
};
const HeartRate = ({
  customRightContent,
  hasBorder,
  index,
  name,
  title,
  value,
  hasDropDown,
  hasToggle,
  selectedValue,
  customContent,
  updateVitals = () => null,
}: {
  title: string;
  name: string;
  value: number;
  hasToggle?: boolean;
  hasDropDown?: boolean;
  hasBorder?: boolean;
  index: number;
  customRightContent: ReactNode;
  customContent: ReactNode;
  selectedValue?: string;
  // TODO(Zucci): Kindly take a look at this eslint issue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateVitals?: (item: any) => void;
}) => {
  const {
    sheetRef: heartRateSheet,
    openSheet: openHeartRateSheet,
    closeSheet: closeHeartRateSheet,
  } = useSheet();

  return (
    <>
      <VitalSignsNumericInput
        title={title}
        name={name}
        value={value}
        hasToggle={hasToggle}
        hasDropDown={hasDropDown}
        customContent={customContent}
        hasBorder={hasBorder}
        key={index}
        onPressDropDown={openHeartRateSheet}
        getCount={count => count}
        customRightContent={customRightContent}
      />

      <AppSelectItemSheet
        title="Heart rate: Measurement site"
        sheetRef={heartRateSheet}
        selectOptions={heartRateOptions}
        selectedValue={selectedValue}
        renderRightIcon={({isSelected}) =>
          isSelected ? <RadioBtnFilledIcon /> : <RadioBtnEmptyIcon />
        }
        onSelectItem={({item}) => {
          updateVitals(item);
          closeHeartRateSheet();
        }}
      />
    </>
  );
};
const HeightRate = ({
  customRightContent,
  hasBorder,
  index,
  name,
  title,
  value,
  hasDropDown,
  hasToggle,
  selectedValue,
  customContent,
  updateVitals = () => null,
}: {
  title: string;
  name: string;
  value: number;
  hasToggle?: boolean;
  hasDropDown?: boolean;
  hasBorder?: boolean;
  index: number;
  customRightContent: ReactNode;
  customContent: ReactNode;
  selectedValue?: string;
  // TODO(Zucci): Kindly take a look at this eslint issue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateVitals?: (item: any) => void;
}) => {
  const {
    sheetRef: heightSheet,
    openSheet: openHeightSheet,
    closeSheet: closeHeightSheet,
  } = useSheet();

  return (
    <>
      <VitalSignsNumericInput
        title={title}
        name={name}
        value={value}
        hasToggle={hasToggle}
        hasDropDown={hasDropDown}
        customContent={customContent}
        hasBorder={hasBorder}
        key={index}
        onPressDropDown={openHeightSheet}
        getCount={count => count}
        customRightContent={customRightContent}
      />

      <AppSelectItemSheet
        title="Height: Measurement site"
        sheetRef={heightSheet}
        selectOptions={heightOptions}
        selectedValue={selectedValue}
        renderRightIcon={({isSelected}) =>
          isSelected ? <RadioBtnFilledIcon /> : <RadioBtnEmptyIcon />
        }
        onSelectItem={({item}) => {
          updateVitals(item);
          closeHeightSheet();
        }}
      />
    </>
  );
};
const TemperatureRate = ({
  customRightContent,
  hasBorder,
  index,
  name,
  title,
  value,
  hasDropDown,
  hasToggle,
  selectedValue,
  customContent,
  updateVitals = () => null,
}: {
  title: string;
  name: string;
  value: number;
  hasToggle?: boolean;
  hasDropDown?: boolean;
  hasBorder?: boolean;
  index: number;
  customRightContent: ReactNode;
  customContent: ReactNode;
  selectedValue?: string;
  // TODO(Zucci): Kindly take a look at this eslint issue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateVitals?: (item: any) => void;
}) => {
  const {
    sheetRef: tempSheet,
    openSheet: openTempSheet,
    closeSheet: closeTempSheet,
  } = useSheet();

  return (
    <>
      <VitalSignsNumericInput
        title={title}
        name={name}
        value={value}
        hasToggle={hasToggle}
        hasDropDown={hasDropDown}
        customContent={customContent}
        hasBorder={hasBorder}
        key={index}
        onPressDropDown={openTempSheet}
        getCount={count => count}
        customRightContent={customRightContent}
      />

      <AppSelectItemSheet
        title="Temperature: Measurement site"
        sheetRef={tempSheet}
        selectOptions={temperatureOptions}
        selectedValue={selectedValue}
        renderRightIcon={({isSelected}) =>
          isSelected ? <RadioBtnFilledIcon /> : <RadioBtnEmptyIcon />
        }
        onSelectItem={({item}) => {
          updateVitals(item);
          closeTempSheet();
        }}
      />
    </>
  );
};
const SPO2Rate = ({
  customRightContent,
  hasBorder,
  index,
  name,
  title,
  value,
  hasDropDown,
  hasToggle,
  selectedValue,
  customContent,
  updateVitals = () => null,
}: {
  title: string;
  name: string;
  value: number;
  hasToggle?: boolean;
  hasDropDown?: boolean;
  hasBorder?: boolean;
  index: number;
  customRightContent: ReactNode;
  customContent: ReactNode;
  selectedValue?: string;
  // TODO(Zucci): Kindly take a look at this eslint issue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateVitals?: (item: any) => void;
}) => {
  const {
    sheetRef: spo2Sheet,
    openSheet: openSpo2Sheet,
    closeSheet: closeSpo2Sheet,
  } = useSheet();

  return (
    <>
      <VitalSignsNumericInput
        title={title}
        name={name}
        value={value}
        hasToggle={hasToggle}
        hasDropDown={hasDropDown}
        customContent={customContent}
        hasBorder={hasBorder}
        key={index}
        onPressDropDown={openSpo2Sheet}
        getCount={count => count}
        customRightContent={customRightContent}
      />

      <AppSelectItemSheet
        title="SPO2: Oxygen source"
        sheetRef={spo2Sheet}
        selectOptions={spo2Options}
        selectedValue={selectedValue}
        renderRightIcon={({isSelected}) =>
          isSelected ? <RadioBtnFilledIcon /> : <RadioBtnEmptyIcon />
        }
        onSelectItem={({item}) => {
          updateVitals(item);
          closeSpo2Sheet();
        }}
      />
    </>
  );
};

export default VitalSigns;
