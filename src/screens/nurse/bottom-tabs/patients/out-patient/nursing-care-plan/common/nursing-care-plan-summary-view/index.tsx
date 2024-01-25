import {RightCaretIcon} from '@/assets/svg';
import AllInputsHistoryListView from '@/components/all-inputs-history-list-view';
import AllInputsHistoryTile from '@/components/all-inputs-history-tile';
import AllInputCollapsibleContent from '@/components/buttons/all-inputs-collapsible-content';
import {AppText} from '@/components/common';
import AppSelectItemSheet from '@/components/sheets/app-select-item-sheet';
import {summaryMenuForNurseCarePlan} from '@/constants/nurseCarePlan';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import VoidFunction from '@/types/voidfunction';
import {ListRenderItem, ListRenderItemInfo} from '@shopify/flash-list';
import React, {useState} from 'react';
import {View} from 'react-native';
import {nursingCarePlanStyles} from '../../styles';
import {wp} from '@/resources/config';

const NursingCarePlanEvaluationView = () => {
  const {closeSheet, openSheet, sheetRef} = useSheet();
  const [isOpen, setIsOpen] = useState(false);

  const {colors} = useColors();
  const styles = nursingCarePlanStyles({colors});

  return (
    <>
      <AllInputCollapsibleContent
        title="Evaluation"
        shouldOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        children={
          <>
            <View style={styles.bottomContent}>
              <HistoryView
                renderItem={props => (
                  <HistoryRenderItem {...props} openSheet={openSheet} />
                )}
              />
            </View>
          </>
        }
      />

      <AppSelectItemSheet
        removeHeader
        sheetRef={sheetRef}
        selectOptions={summaryMenuForNurseCarePlan}
        renderRightIcon={() => <RightCaretIcon stroke={colors.text400} />}
        onSelectItem={() => {
          closeSheet();
        }}
      />
    </>
  );
};

const HistoryTile = ({openSheet}: {openSheet: VoidFunction}) => {
  return (
    <AllInputsHistoryTile
      time={'9:00AM'}
      date={'Today'}
      onPress={openSheet}
      textComponent={
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
          <AppText
            type={'caption_semibold'}
            text={[
              <AppText
                key={0}
                text={'Outcomes'}
                color="text300"
                type={'caption_semibold'}
              />,
              ' - Activity tolerance',
            ]}
          />
          <AppText
            type={'caption_semibold'}
            text={[
              <AppText
                key={0}
                text={'Interventions'}
                color="text300"
                type={'caption_semibold'}
              />,
              ' Cardiac care: rehabilitation, Exercise',
            ]}
          />
        </View>
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

const HistoryView = ({
  renderItem,
}: {
  renderItem: ListRenderItem<number> | null | undefined;
}) => {
  return (
    <AllInputsHistoryListView
      // TODO(Zucci): This is temporal and would be removed during integration
      data={[1]}
      renderItem={renderItem}
    />
  );
};

export default NursingCarePlanEvaluationView;
