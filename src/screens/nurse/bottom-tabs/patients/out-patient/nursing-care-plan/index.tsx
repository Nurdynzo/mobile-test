import AppScreen from '@/components/app-screen';
import PatientInfoCard from '@/components/cards/Patients/patient-info-card';
import {AppText} from '@/components/common';
import {AppHeader} from '@/components/headers';
import AppSpacer from '@/components/spacer/AppSpacer';
import {useColors} from '@/hooks/useColors';
import {wp} from '@/resources/config';
import {EMPTY_STRING} from '@/utils/constants';
import React from 'react';
import {View} from 'react-native';
import CollapsibleSiteCard from '../common/collapsible-site-card';
import {nursingCarePlanStyles} from './styles';

const NursingCarePlan = () => {
  const {colors} = useColors();

  const styles = nursingCarePlanStyles({colors});

  return (
    <>
      <AppScreen
        ScreenHeader={
          <>
            <View style={styles.header}>
              <AppHeader
                paddingHorizontal={0}
                paddingBottom={0}
                middleTitle="Nurse care plan"
              />
              <AppSpacer direction="bottom" marginOrPadding="padding" />
              <PatientInfoCard
                fullName={'Zucci Daniel'}
                code={'HOSP1000808'}
                dateOfBirth={'2020-08-25T10:15:30.000Z'}
                gender={'Male'}
              />
            </View>
          </>
        }>
        <View style={styles.screen}>
          <View style={styles.container}>
            <CollapsibleSiteCard
              title="Nursing diagnosis"
              leadingLabel="Diagnosis selected"
              data={[{id: EMPTY_STRING, name: 'left flank'}]}
            />
            <CollapsibleSiteCard
              title="Nursing outcomes"
              leadingLabel="Enter outcomes"
              data={[{id: EMPTY_STRING, name: 'left flank'}]}
            />
            <CollapsibleSiteCard
              title="Nursing interventions"
              leadingLabel="Enter interventions"
              data={[{id: EMPTY_STRING, name: 'left flank'}]}
            />
            <CollapsibleSiteCard
              title="Activities"
              leadingLabel=""
              data={[{id: EMPTY_STRING, name: 'left flank'}]}
            />
            <CollapsibleSiteCard
              title="Evaluation"
              leadingLabel=""
              isSummary
              customContent={
                <View style={{gap: wp(10)}}>
                  <AppText
                    type={'body_2_semibold'}
                    text={[
                      <AppText
                        key={0}
                        text={'Care plan. Entered by ACNO Yasmine'}
                        type={'caption_semibold'}
                      />,
                    ]}
                  />
                  <AppText
                    type={'caption_semibold'}
                    text={[
                      <AppText
                        key={0}
                        text={'Diagnosis'}
                        color="text300"
                        type={'caption_semibold'}
                      />,
                      ' - Activity intolerance',
                    ]}
                  />
                </View>
              }
            />
          </View>
        </View>
      </AppScreen>
    </>
  );
};

export default NursingCarePlan;
