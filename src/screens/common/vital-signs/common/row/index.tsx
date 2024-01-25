import * as React from 'react';
import {useColors} from '@/hooks/useColors';
import {ColorKeys} from '@/resources/colors';
import {vitalSignsStyles} from '../../styles';
import {TouchableOpacity, View} from 'react-native';
import {AppText} from '@/components/common';
import {MoreVerticalIcon} from '@/assets/svg';
import {fs} from '@/resources/config';

// TODO(Zucci): use AllInputHistoryTile for this.

const Row = ({
  date,
  text = 'Vital signs as at 9:00 AM Today',
  time,
  onPressMore,
  textColor,
  isSmall = false,
  showMore = false,
}: {
  time?: string;
  date?: string;
  text?: string;
  textColor?: ColorKeys;
  onPressMore?: () => void;
  isSmall?: boolean;
  showMore?: boolean;
}) => {
  const {colors} = useColors();
  const styles = vitalSignsStyles({colors});
  return (
    <View style={styles.rowContainer}>
      <View style={{flex: 0.3}}>
        <AppText type="status_tag_semibold" color="text100" text={time} />
        <AppText
          type="status_tag_semibold"
          color="text50"
          style={{textTransform: 'capitalize'}}
          text={date}
        />
      </View>
      <View style={{flex: 1}}>
        <AppText
          type="subtitle_semibold"
          color={textColor || 'text400'}
          align="left"
          text={text}
          style={isSmall && {fontSize: fs(14)}}
        />
      </View>
      {showMore ? (
        <TouchableOpacity onPress={onPressMore}>
          <MoreVerticalIcon />
        </TouchableOpacity>
      ) : (
        <View style={{flex: 0.1}} />
      )}
    </View>
  );
};

export default Row;
