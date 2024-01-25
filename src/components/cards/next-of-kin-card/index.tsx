import React from 'react';
import {View} from 'react-native';
import {useColors} from '../../../hooks/useColors';
import {AppRow, AppText} from '../../common';
import RecordRow from '../record-row';
import {nextOfKinCardStyles} from './styles';

const NextOfKinCard = () => {
  const {colors} = useColors();

  const styles = nextOfKinCardStyles({colors});
  return (
    <>
      <View style={styles.container}>
        <AppRow alignItems="flex-start">
          <RecordRow
            detail="Next of kin"
            children={
              <>
                <AppText
                  color="text400"
                  type="body_1_semibold"
                  text={'Lola Lianny'}
                />
              </>
            }
          />
        </AppRow>

        <AppRow alignItems="flex-start">
          <RecordRow
            detail="Relationship"
            children={
              <>
                <AppText
                  color="text400"
                  type="body_1_semibold"
                  text={'Mother'}
                />
              </>
            }
          />
          <RecordRow
            detail="Phone number"
            children={
              <>
                <AppText
                  color="text400"
                  type="body_1_semibold"
                  text={'07001234567'}
                />
              </>
            }
          />
        </AppRow>
      </View>
    </>
  );
};

export default NextOfKinCard;
