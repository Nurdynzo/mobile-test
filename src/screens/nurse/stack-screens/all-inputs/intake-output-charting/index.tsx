import AppScreen from '@/components/app-screen';
import {AppButton} from '@/components/buttons';
import PatientInfoCard from '@/components/cards/Patients/patient-info-card';
import {DynamicAppHeader} from '@/components/headers';
import {BottomIndicatorTabSwitcher} from '@/components/tabs';
import * as Contants from '@/constants/index';
import {GeneralScreenProps} from '@/navigation/types';
import {
  useApiServicesAppIntakeoutputGetintakesuggestionsGetQuery,
  useApiServicesAppIntakeoutputGetoutputsuggestionsGetQuery,
} from '@/state/services/intakeOutputApi';
import {useApiServicesAppPatientsGetpatientdetailsGetQuery} from '@/state/services/patientApi';
import React, {FunctionComponent, useRef, useState} from 'react';
import {Animated, View} from 'react-native';
import IntakeOutputChartingView from './intake-output-charting-view';
import {useGetIntakeOutputSavedHistory} from './intake-output-charting-view/use-get-intake-output-saved-history';
import {intakeOrOutputChartViewStyles} from './styles';
import {useSaveIntake} from './use-save-intake';
import {useSaveOutput} from './use-save-output';

const IntakeOutputCharting: FunctionComponent<
  GeneralScreenProps<'NURSE_INTAKE_OUTPUT_CHARTING'>
> = ({route}) => {
  const [selectedTab, setSelectedTab] = useState(
    Contants.intakeOutputCharting[0],
  );
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const {data: patientDetails} =
    useApiServicesAppPatientsGetpatientdetailsGetQuery({
      patientId: route.params?.patientId,
    });

  return (
    <AppScreen
      paddingHorizontal={24}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
        {useNativeDriver: false},
      )}
      ScreenHeader={
        <>
          <View style={intakeOrOutputChartViewStyles.subHeaderContainer}>
            <DynamicAppHeader
              animatedValue={scrollOffsetY}
              screenTitle="Intake & output charting"
            />
            <PatientInfoCard
              fullName={'Franklun Okeke'}
              dateOfBirth={'2020-08-25T10:15:30.000Z'}
              code={'PT-002'}
              gender={'male'}
            />
            <BottomIndicatorTabSwitcher
              tabs={Contants.intakeOutputCharting}
              onChangeTab={setSelectedTab}
              selectedTab={selectedTab}
            />
          </View>
        </>
      }>
      {selectedTab === 'Intake' ? (
        <IntakeChartingView
          patientId={route.params?.patientId}
          patientFullName={patientDetails?.fullName as string}
        />
      ) : (
        <OutputChartingView
          patientId={route.params?.patientId}
          patientFullName={patientDetails?.fullName as string}
        />
      )}
    </AppScreen>
  );
};

export default IntakeOutputCharting;

const IntakeChartingView: FunctionComponent<{
  patientId: number;
  patientFullName: string;
}> = ({patientId, patientFullName}) => {
  const {data} = useApiServicesAppIntakeoutputGetintakesuggestionsGetQuery({
    patientId,
  });

  const {data: intakeHistory} = useGetIntakeOutputSavedHistory({
    patientId,
    type: 'Intake',
  });

  const {handleSave, isCreateIntakeLoading} = useSaveIntake({
    patientId,
    patientFullName,
  });

  return (
    <IntakeOutputChartingView
      title="Intake"
      isSaveLoading={isCreateIntakeLoading}
      chartingSuggestions={data?.suggestedText ?? []}
      TralingComponent={
        <AppButton
          text={'Graph'}
          isDisabled
          containerStyle={intakeOrOutputChartViewStyles.editBtn}
        />
      }
      chartingSummary={intakeHistory}
      onSave={handleSave}
    />
  );
};

const OutputChartingView: FunctionComponent<{
  patientId: number;
  patientFullName: string;
}> = ({patientId, patientFullName}) => {
  const {data} = useApiServicesAppIntakeoutputGetoutputsuggestionsGetQuery({
    patientId,
  });

  const {data: outputHistory} = useGetIntakeOutputSavedHistory({
    patientId,
    type: 'Output',
  });

  const {handleSave, isCreateOutputLoading} = useSaveOutput({
    patientId,
    patientFullName,
  });
  return (
    <IntakeOutputChartingView
      title="Output"
      isSaveLoading={isCreateOutputLoading}
      chartingSuggestions={data?.suggestedText ?? []}
      chartingSummary={outputHistory}
      onSave={handleSave}
    />
  );
};
