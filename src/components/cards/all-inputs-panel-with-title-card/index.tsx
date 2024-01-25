import React from 'react';
import {View} from 'react-native';
import AppText from '@/components/common/app-text';
import {allInputsPanelWithTitleCardStyles} from './styles';
import {useColors} from '@/hooks/useColors';
import {AppSeperator} from '@/components/common';

const AllInputsPanelWithTitleCard = ({
  children,
  title,
  TralingComponent,
}: {
  title: string;
  children: React.ReactNode;
  TralingComponent?: React.ReactNode;
}) => {
  const {colors} = useColors();
  const styles = allInputsPanelWithTitleCardStyles({colors});

  return (
    <View style={styles.container}>
      <View style={styles.titleConatiner}>
        <AppText text={title} type={'title_semibold'} />
        {TralingComponent}
      </View>
      <AppSeperator style={styles.divider} />

      {children}
    </View>
  );
};

export default AllInputsPanelWithTitleCard;
