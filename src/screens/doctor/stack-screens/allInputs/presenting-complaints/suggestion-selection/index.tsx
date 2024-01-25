import {DownCaretIcon} from '@/assets/svg';
import {
  AllInputsAddNotesButton,
  AllInputsPlusButton,
  AppButton,
} from '@/components/buttons';
import {AllInputsPanelWithTitleCard} from '@/components/cards';
import React from 'react';
import {View} from 'react-native';
import useAddNoteButton from '@/hooks/useAddNoteButton';
import {AddNotesButtonState} from '@/types/addNoteButtonState';
import * as Constants from '@/constants/index';
import {presentingComplaintsSuggestionSelectionStyles} from './styles';
import AllInputsHistoryListView from '@/components/all-inputs-history-list-view';
import AllInputsHistoryTile from '@/components/all-inputs-history-tile';
import {AppText} from '@/components/common';
import {ListRenderItemInfo} from '@shopify/flash-list';

const PresentingComplaintsSuggestionView = ({
  activeTab,
}: {
  activeTab: number;
}) => {
  const {title, view} = Constants.socratesViewItems[activeTab];
  const styles = presentingComplaintsSuggestionSelectionStyles();
  return (
    <AllInputsPanelWithTitleCard title={title}>
      {view}

      <AddNotesAndAddSymptomView />

      <AppButton isDisabled text={'Save'} containerStyle={styles.saveButton} />

      <HistoryView />

      <View style={styles.socialAndPastHistoryContainer}>
        <AppButton
          isDisabled
          text={'Past medical hx'}
          containerStyle={styles.socialAndPastHistoryFlex}
        />
        <AppButton
          isDisabled
          text={'Social hx'}
          containerStyle={styles.socialAndPastHistoryFlex}
        />
      </View>

      <AppButton
        isDisabled
        text={'Review detailed hx'}
        containerStyle={styles.reviewDetailedHistoryButton}
        RightContent={<DownCaretIcon stroke={'white'} />}
      />
    </AllInputsPanelWithTitleCard>
  );
};

const AddNotesAndAddSymptomView = () => {
  const styles = presentingComplaintsSuggestionSelectionStyles();
  const addNotesButtonState = useAddNoteButton();

  const addNoteButton = (
    <AllInputsAddNotesButton
      addButtonLabel={'Add symptom notes'}
      buttonState={addNotesButtonState}
      buttonStyle={styles.addNotesButton}
    />
  );

  const addSymptomButton = (
    <AllInputsPlusButton
      text={'Add symptom'}
      isDisabled={false}
      onPress={() => {}}
      buttonStyle={styles.plusButton}
    />
  );

  return addNotesButtonState.state === AddNotesButtonState.open ? (
    <View style={styles.addNoteOpenedContainer}>
      {addNoteButton}
      {addSymptomButton}
    </View>
  ) : (
    <>
      <View style={styles.addNoteClosedContainer}>
        {addNoteButton}
        {addSymptomButton}
      </View>
    </>
  );
};

const HistoryView = () => {
  return (
    <AllInputsHistoryListView
      // TODO(Philip): This is temporal and would be removed during integration
      data={[1, 2, 3, 4, 5, 6, 7]}
      renderItem={HistoryRenderItem}
    />
  );
};

const HistoryRenderItem = ({index}: ListRenderItemInfo<number>) => {
  return <HistoryTile key={index} />;
};

const HistoryTile = () => {
  return (
    <AllInputsHistoryTile
      time={'9:00AM'}
      date={'Today'}
      onPress={() => {}}
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
export default PresentingComplaintsSuggestionView;
