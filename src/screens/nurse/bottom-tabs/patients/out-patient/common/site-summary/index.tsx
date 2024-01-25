import {RightCaretIcon} from '@/assets/svg';
import AllInputsHistoryListView from '@/components/all-inputs-history-list-view';
import AllInputsHistoryTile from '@/components/all-inputs-history-tile';
import {AppText} from '@/components/common';
import AppSelectItemSheet from '@/components/sheets/app-select-item-sheet';
import {summaryMenuForMiscellaneousInterventions} from '@/constants/miscellaneousInterventions';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import VoidFunction from '@/types/voidfunction';
import {ListRenderItem, ListRenderItemInfo} from '@shopify/flash-list';
import React from 'react';
import {View} from 'react-native';
import {commonStyles} from '../styles';

const SiteSummary = () => {
  const {closeSheet, openSheet, sheetRef} = useSheet();

  const {colors} = useColors();
  const styles = commonStyles({colors});
  return (
    <>
      <View style={styles.bottomContent}>
        <HistoryView
          renderItem={props => (
            <HistoryRenderItem {...props} openSheet={openSheet} />
          )}
        />
      </View>
      <AppSelectItemSheet
        removeHeader
        sheetRef={sheetRef}
        selectOptions={summaryMenuForMiscellaneousInterventions}
        renderRightIcon={() => <RightCaretIcon stroke={colors.text400} />}
        onSelectItem={() => {
          openSheet();
          closeSheet();
        }}
      />
    </>
  );
};

export default SiteSummary;

const HistoryTile = ({openSheet}: {openSheet: VoidFunction}) => {
  return (
    <AllInputsHistoryTile
      time={'9:00AM'}
      date={'Today'}
      onPress={openSheet}
      textComponent={
        <AppText
          type={'body_2_semibold'}
          text={[
            <AppText key={0} text={'Abdominal pain'} type={'body_2_bold'} />,
            ' - umbilical region; began 3 weeks ago; characterized as dull, piercing, not described as persistent, throbbing; radiates to the chest part, does not radiate to the groin area; associated with nausea, no history of garbled speech; lasts for 3 hours at night; exacerbated by eating much, relieved by resting; described as 6 on a 0 - 10 scale',
          ]}
        />
      }
    />
  );
};

const HistoryRenderItem = ({
  index,
  openSheet = () => null,
}: ListRenderItemInfo<number> & {openSheet: VoidFunction}) => {
  return <HistoryTile key={index} openSheet={openSheet} />;
};

const HistoryView = ({renderItem}: {renderItem: ListRenderItem<number>}) => {
  return (
    <AllInputsHistoryListView
      // TODO(Zucci): This is temporal and would be removed during integration
      data={[1, 2, 3, 4, 5, 6, 7]}
      renderItem={renderItem}
    />
  );
};
