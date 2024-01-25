import {AllInputsPillButton, AppButton} from '@/components/buttons';
import {AppRow, AppText} from '@/components/common';
import {AppContentSheet} from '@/components/sheets';
import {ScrollableTab} from '@/components/tabs';
import {useColors} from '@/hooks/useColors';
import {wp} from '@/resources/config';
import React from 'react';
import {View} from 'react-native';
import {vitalSignsStyles} from '../../styles';
import {useVitalSigns} from '../../useVitalSigns';
import {useCheckGcs} from './useCheckGcs';
import {eyes} from '@/constants/vitalSigns';

const CheckGcs = () => {
  const {checkGCSsheet, closeCheckGCSsheet, openCheckGCSsheet} = useCheckGcs();
  const {colors} = useColors();
  const {selectedCGSscoreTab, setSelectedCGSscoreTab, totalScore} =
    useVitalSigns();

  const styles = vitalSignsStyles({colors});

  const renderPredictiveContent = () => {
    switch (selectedCGSscoreTab) {
      case 0:
        return <FirstPrediction />;
      case 1:
        return <SecondPrediction />;
      case 2:
        return <ThirdPrediction />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <>
        <AppRow
          extraStyles={{
            width: '70%',
          }}>
          <View style={{flex: 1}}>
            <AppText
              type="title_semibold"
              align="center"
              color="text400"
              text={0}
              style={{alignSelf: 'center'}}
            />
          </View>
          <AppButton
            onPress={openCheckGCSsheet}
            text="Check GCS"
            containerStyle={{width: wp(120)}}
          />
        </AppRow>
      </>

      <AppContentSheet headerTitle="GCS score" sheetRef={checkGCSsheet}>
        <View style={{gap: 10}}>
          <ScrollableTab
            tabs={[
              'Eyes opening score',
              'Verbal response score',
              'Motor response score',
            ]}
            currentIndex={selectedCGSscoreTab}
            activeColor={{
              background: 'default300',
              border: 'transparent',
            }}
            unActiveColor={{
              background: 'neutral100',
              border: 'default200',
            }}
            onPress={index => setSelectedCGSscoreTab(index)}
          />
          <View style={styles.takeContainer}>
            {renderPredictiveContent()}
            <AppRow>
              <View style={styles.score}>
                <AppText
                  type="body_2_medium"
                  align="left"
                  color="text50"
                  text={'GCS score:'}
                />
                <AppText
                  type="body_2_bold"
                  align="left"
                  color="text400"
                  text={` ${totalScore}`}
                />
              </View>
              <AppButton
                onPress={closeCheckGCSsheet}
                text="Done"
                isDisabled={totalScore === 0}
                containerStyle={styles.save}
              />
            </AppRow>
          </View>
        </View>
      </AppContentSheet>
    </>
  );
};

const FirstPrediction = () => {
  const {colors} = useColors();
  const {scores, handleAddPointToScore} = useVitalSigns();
  const styles = vitalSignsStyles({colors});

  return (
    <>
      <View style={styles.predictiveTextContainer}>
        <AppText
          type="body_2_medium"
          align="left"
          color="text50"
          text={scores?.['eye opening score']?.text || 'Click predictive text'}
        />
      </View>
      <View style={styles.chipsContainer}>
        {eyes.map((item, index) => (
          <AllInputsPillButton
            key={index}
            text={item.text}
            onPress={() =>
              handleAddPointToScore({
                ...item,
                field: 'eye opening score',
              })
            }
          />
        ))}
      </View>
    </>
  );
};

const SecondPrediction = () => {
  const {colors} = useColors();
  const {scores, handleAddPointToScore} = useVitalSigns();
  const styles = vitalSignsStyles({colors});

  return (
    <>
      <View style={styles.predictiveTextContainer}>
        <AppText
          type="body_2_medium"
          align="left"
          color="text50"
          text={
            scores?.['verbal response score']?.text || 'Click predictive text'
          }
        />
      </View>
      <View style={styles.chipsContainer}>
        {eyes.map((item, index) => (
          <AllInputsPillButton
            key={index}
            text={item.text}
            onPress={() =>
              handleAddPointToScore({
                ...item,
                field: 'verbal response score',
              })
            }
          />
        ))}
      </View>
    </>
  );
};

const ThirdPrediction = () => {
  const {colors} = useColors();
  const {scores, handleAddPointToScore} = useVitalSigns();
  const styles = vitalSignsStyles({colors});

  return (
    <>
      <View style={styles.predictiveTextContainer}>
        <AppText
          type="body_2_medium"
          align="left"
          color="text50"
          text={
            scores?.['motor response score']?.text || 'Click predictive text'
          }
        />
      </View>
      <View style={styles.chipsContainer}>
        {eyes.map((item, index) => (
          <AllInputsPillButton
            key={index}
            text={item.text}
            onPress={() =>
              handleAddPointToScore({
                ...item,
                field: 'motor response score',
              })
            }
          />
        ))}
      </View>
    </>
  );
};

export default CheckGcs;
