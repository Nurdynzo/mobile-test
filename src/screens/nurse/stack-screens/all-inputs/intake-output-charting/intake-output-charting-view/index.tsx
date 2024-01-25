import AllInputsHistoryTile from '@/components/all-inputs-history-tile';
import {AppButton} from '@/components/buttons';
import {AllInputsPanelWithTitleCard} from '@/components/cards';
import {AppSeperator, AppText} from '@/components/common';
import {AppTextInput} from '@/components/inputs';
import {ArrowRightIcon, BinIcon} from '@/assets/svg';
import {
  AllInputsSuggestionForm,
  useAllInputsSuggestionForm,
} from '@/components/forms';
import {AppMenuSheet} from '@/components/sheets';
import {useSheet} from '@/hooks/useSheet';
import {wp} from '@/resources/config';
import {SuggestedTextDto} from '@/state/services/intakeOutputApi';
import {MenuOptionsProp} from '@/types/menusheet';
import {checkDay, convertToReadableTime} from '@/utils/helpers/convertDateTime';
import React, {FunctionComponent, useState} from 'react';
import {View} from 'react-native';
import {OnSaveProps} from '../types';
import {intakeOutputChartingViewStyles} from './styles';
import {useDeleteIntakeOrOutput} from './use-delete-intake-or-output';
import {EMPTY_STRING} from '@/utils/constants';

const IntakeOutputChartingView: FunctionComponent<{
  title: string;
  chartingSummary: SuggestedTextDto[];
  TralingComponent?: React.ReactNode;
  onSave: (props: OnSaveProps) => void;
  isSaveLoading?: boolean;
  chartingSuggestions: SuggestedTextDto[];
}> = ({
  chartingSummary = [],
  title,
  TralingComponent,
  onSave,
  isSaveLoading,
  chartingSuggestions = [],
}) => {
  const styles = intakeOutputChartingViewStyles;

  const [volumnInMls, setVolumnInMls] = useState(EMPTY_STRING);

  const formProps = useAllInputsSuggestionForm({isSingleSelect: true});
  const {reset, selectedItems} = formProps;
  return (
    <AllInputsPanelWithTitleCard
      title={title}
      TralingComponent={TralingComponent}>
      <AllInputsSuggestionForm
        isSingleSelect
        formProps={formProps}
        suggestions={chartingSuggestions.map(el => ({
          id: el.id?.toString(),
          name: el.suggestedText,
        }))}
        ContentInBetweenSuggesstionsFields={
          <AppTextInput
            placeholder="Enter volume"
            RightContent={<AppText text="mls" color="default600" />}
            onChangeText={setVolumnInMls}
            value={volumnInMls}
            baseContainerStyle={{marginBottom: wp(8)}}
          />
        }
        expandSheetHeaderTitle={'Select suggestion(s) for intake'}
      />

      <AppButton
        text="Save"
        isLoading={isSaveLoading}
        isDisabled={isSaveLoading}
        containerStyle={styles.saveBtn}
        onPress={() =>
          onSave({
            data: {
              suggestedText: selectedItems[0]?.name as string,
              volumnInMls,
            },
            reset: () => {
              reset();
              setVolumnInMls(EMPTY_STRING);
            },
          })
        }
      />

      {chartingSummary.length ? (
        <>
          <AppSeperator style={styles.seperator} />

          <View style={styles.gap16}>
            {chartingSummary.map(item => (
              <IntakeOutputHistoryCard
                key={item.id}
                item={item}
                patientFullName=""
              />
            ))}
          </View>
        </>
      ) : (
        <></>
      )}
    </AllInputsPanelWithTitleCard>
  );
};

export default IntakeOutputChartingView;

const IntakeOutputHistoryCard: FunctionComponent<{
  item: SuggestedTextDto;
  patientFullName: string;
}> = ({item, patientFullName}) => {
  const {sheetRef, openSheet, closeSheet} = useSheet();
  const {handleDeleteIntakeOrOutput, isDeletingIntakeOrOutput} =
    useDeleteIntakeOrOutput({
      patientFullName,
    });

  const menuOptions: MenuOptionsProp = [
    {value: 'Link to care plan', onPress: () => null},
    {value: 'Mark as done', onPress: () => null},
    {value: 'Highlight for attention', onPress: () => null},
    {
      value: 'Delete',
      onPress: () => handleDeleteIntakeOrOutput(item.id),
      renderRightIcon: () => <BinIcon />,
      color: 'danger300',
    },
  ];

  return (
    <>
      <AllInputsHistoryTile
        key={item.id}
        // TODO(Franklyn): once i get the createdAt i will update the actual date
        date={checkDay(new Date())}
        time={convertToReadableTime(new Date())}
        onPress={openSheet}
        isLoading={isDeletingIntakeOrOutput}
        textComponent={
          <AppText
            text={`${item.suggestedText} - ${item.volumnInMls} mls`}
            type="body_2_semibold"
            color="text400"
          />
        }
      />
      <AppMenuSheet
        sheetRef={sheetRef}
        closeSheet={closeSheet}
        removeHeader
        renderRightIcon={() => <ArrowRightIcon />}
        menuOptions={menuOptions}
      />
    </>
  );
};
