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
import useAddNoteButton from '@/hooks/useAddNoteButton';
import {useColors} from '@/hooks/useColors';
import {wp} from '@/resources/config';
import {EMPTY_STRING} from '@/utils/constants';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {proceduresStyles} from '../../styles';
import RequestProceduresSummaryView from '../request-procedures-summary-view';

const RequestProceduresView = () => {
  const {colors} = useColors();
  const styles = proceduresStyles({colors});
  const addNotesButtonState = useAddNoteButton();
  return (
    <ScrollView contentContainerStyle={{paddingHorizontal: wp(24)}}>
      <AllInputsPanelWithTitleCard title="Request procedures">
        <View style={styles.line} />
        <AllInputsSuggestionsInput
          placeholder="Click predictive text or type here"
          suggestions={[{id: EMPTY_STRING, name: 'Left flank'}]}
          onPressPlusIcon={() => {}}
          onRemoveItem={_ => {}}
        />
        <AllInputsSuggestionsContainer
          leadingComponent={
            <SuggestionsExpandedSelectionView
              suggestions={[{id: '', name: 'Left flank'}]}
              headerTitle="Select suggestion(s) for request procedures"
            />
          }>
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
          containerStyle={styles.requestProceduresSaveButton}
        />
        <AppDivider marginBottom={24} />
        <RequestProceduresSummaryView />
      </AllInputsPanelWithTitleCard>
    </ScrollView>
  );
};

export default RequestProceduresView;
