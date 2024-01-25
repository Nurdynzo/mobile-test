import AllInputsSuggestionsContainer from '@/components/all-inputs-suggestions-container';
import {AllInputsPillButton} from '@/components/buttons';
import {AllInputsSuggestionsInput} from '@/components/inputs';
import React from 'react';
import {SocratesQuestionText, SocratesSuggestionToggleButton} from './common';
import SuggestionSelectionLeadingView from '@/components/suggestion-selection-leading-view';

const AssociationsView = () => {
  return (
    <>
      <SocratesQuestionText
        text={'Is there anything else associated with the Headache?'}
      />
      <AllInputsSuggestionsInput
        suggestions={[{id: '', name: 'Left flank'}]}
        onPressPlusIcon={() => {}}
        onRemoveItem={_ => {}}
      />
      <AllInputsSuggestionsContainer
        leadingComponent={
          <SuggestionSelectionLeadingView
            onTapExpand={() => {}}
            toggleButton={
              <SocratesSuggestionToggleButton
                activeItem={'Present'}
                setActiveItem={_ => {}}
              />
            }
          />
        }>
        {[{id: '', name: 'Left flank'}].map((item, index) => (
          <AllInputsPillButton
            key={index}
            text={item.name}
            isSelected
            onPress={() => {}}
          />
        ))}
      </AllInputsSuggestionsContainer>
    </>
  );
};

export default AssociationsView;
