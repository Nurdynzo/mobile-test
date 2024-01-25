import AllInputsSuggestionsContainer from '@/components/all-inputs-suggestions-container';
import AppDivider from '@/components/app-divider';
import {
  AllInputsAddNotesButton,
  AllInputsPillButton,
  AppButton,
} from '@/components/buttons';
import {AllInputsPanelWithTitleCard} from '@/components/cards';
import {AllInputsSuggestionsInput} from '@/components/inputs';
import SuggestionsExpandedSelectionView from '@/components/suggestions-expanded-selection-view';
import {ScrollableTab} from '@/components/tabs';
import {tabs} from '@/constants/procedures';
import useAddNoteButton from '@/hooks/useAddNoteButton';
import {useColors} from '@/hooks/useColors';
import {wp} from '@/resources/config';
import {EMPTY_STRING} from '@/utils/constants';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {proceduresStyles} from '../../styles';
import RecordProceduresSummaryView from '../record-procedures-summary-view';
import RecordedProcedures from '../recorded-procedures';
import ScrollablePillSummary from '../scrollable-pill-summary';

const RecordProceduresView = () => {
  const {colors} = useColors();
  const styles = proceduresStyles({colors});
  const [currentTab, setCurrentTab] = useState<number | null>(null);
  const addNotesButtonState = useAddNoteButton();
  return (
    <>
      <ScrollableTab
        tabs={tabs}
        currentIndex={currentTab}
        activeColor={{background: 'default300'}}
        unActiveColor={{background: 'neutral100'}}
        onPress={index => setCurrentTab(currentTab !== index ? index : null)}
        style={{marginBottom: wp(16)}}
      />
      <ScrollView contentContainerStyle={{paddingHorizontal: wp(24)}}>
        <AllInputsPanelWithTitleCard title="Record procedures">
          <AllInputsSuggestionsInput
            placeholder="Click predictive text or type here"
            suggestions={[{id: EMPTY_STRING, name: 'Left flank'}]}
            onPressPlusIcon={() => {}}
            onRemoveItem={_ => {}}
          />
          <AllInputsSuggestionsContainer
            leadingComponent={<SuggestionsExpandedSelectionView />}>
            {[{id: EMPTY_STRING, name: 'Left flank'}].map((item, index) => (
              <AllInputsPillButton
                key={index}
                text={item.name}
                isSelected
                onPress={() => {}}
              />
            ))}
          </AllInputsSuggestionsContainer>

          <AllInputsAddNotesButton
            addButtonLabel={'Add procedures notes'}
            buttonState={addNotesButtonState}
            buttonStyle={styles.addNotesButton}
          />
          <AppButton
            text="Save"
            containerStyle={styles.recordProceduresSaveButton}
          />
          <View style={{gap: wp(32)}}>
            <ScrollablePillSummary />
            <RecordedProcedures />
          </View>
          <AppDivider marginTop={16} marginBottom={24} />
          <RecordProceduresSummaryView />
        </AllInputsPanelWithTitleCard>
      </ScrollView>
    </>
  );
};

export default RecordProceduresView;
