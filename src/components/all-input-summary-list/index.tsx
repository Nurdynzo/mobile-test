import {FlatList, View} from 'react-native';
import {AppText} from '../common';
import AppSpacer from '../spacer/AppSpacer';
import React, {ComponentType, ReactElement} from 'react';
import AppDivider from '../app-divider';
import dayjs from 'dayjs';
import {MoreVerticalIcon} from '../../assets/svg';
import {allInputSummaryStyle} from './styles';

export function AllInputSummaryList({
  summaryData,
  ListHeaderComponent,
  showDivider = true,
}: {
  summaryData: {
    creationTime: string;
    description: string;
  }[];
  ListHeaderComponent?: ComponentType | ReactElement | null | undefined;
  showDivider?: boolean;
}) {
  const styles = allInputSummaryStyle();

  return (
    <>
      {showDivider && <AppDivider />}
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: 1400,
        }}
        data={summaryData?.slice(0, 10)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <>
            <View style={styles.rowSpaceBetween}>
              <View>
                <AppText
                  text={dayjs(item?.creationTime).format('HH:mm A')}
                  color="text100"
                />
              </View>
              <View style={styles.description}>
                <AppText text={item?.description} />
              </View>
              <View>
                <MoreVerticalIcon />
              </View>
            </View>
            <AppSpacer direction="bottom" />
          </>
        )}
      />
    </>
  );
}
