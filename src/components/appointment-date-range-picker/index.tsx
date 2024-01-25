import React, {useState} from 'react';
import {View} from 'react-native';
import Overlay from '../overlay';
import {AppRow, AppText} from '../common';
import {AppDateTimeInput} from '../inputs';
import {AppButton} from '../buttons';
import {appointmentDateRangePickerStyles} from './styles';
import {useColors} from '@/hooks/useColors';
import {AppointmentDateRangerPickerType} from './type';
import DateRange from '@/types/dateRange';

const AppointmentDateRangerPicker = ({
  to,
  onCancel,
  onChangeTo = (to: Date | string | null) => to,
  onChangeFrom = (from: Date | string | null) => from,
  onDone,
  onOverlayTap,
  show,
  from,
  mode = 'time',
}: AppointmentDateRangerPickerType) => {
  const {colors} = useColors();
  const styles = appointmentDateRangePickerStyles({colors});

  const [dateRange, setDateRange] = useState<DateRange>({
    to,
    from,
  });

  const _onDone = () => {
    onDone({...dateRange});
    setDateRange({});
  };
  return (
    <Overlay onOverlayTap={onOverlayTap} show={show} offset={122}>
      <View style={styles.overlayTop}>
        <AppText
          color="text300"
          type="title_semibold"
          text={'See appointments'}
        />
        <AppRow extraStyles={styles.gap}>
          <AppDateTimeInput
            mode={mode}
            extraFontStyle={{fontSize: 12}}
            value={dateRange.from as Date}
            placeholder="From"
            onChange={from => {
              setDateRange({...dateRange, from});
              onChangeFrom(from as Date);
            }}
          />
          <AppDateTimeInput
            mode={mode}
            extraFontStyle={{fontSize: 12}}
            placeholder="To"
            value={dateRange.to as Date}
            onChange={to => {
              setDateRange({...dateRange, to});
              onChangeTo(to);
            }}
          />
        </AppRow>
      </View>
      <AppRow extraStyles={styles.calenderBtnWrapper}>
        <AppButton
          buttonColor={'white'}
          borderWidth={1}
          text="Cancel"
          textColor={'primary400'}
          borderColor={'primary400'}
          containerStyle={{width: undefined}}
          onPress={onCancel}
        />
        <AppButton
          text="Done"
          onPress={_onDone}
          containerStyle={{width: undefined}}
        />
      </AppRow>
    </Overlay>
  );
};

export default AppointmentDateRangerPicker;
