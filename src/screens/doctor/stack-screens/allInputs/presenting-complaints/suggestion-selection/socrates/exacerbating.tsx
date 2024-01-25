import {AllInputsPillButton} from '@/components/buttons';
import {AllInputsSuggestionsInput} from '@/components/inputs';
import React from 'react';
import {SocratesQuestionText, SocratesSuggestionToggleButton} from './common';
import AllInputsSuggestionsContainer from '@/components/all-inputs-suggestions-container';
import SuggestionSelectionLeadingView from '@/components/suggestion-selection-leading-view';

const ExacerbatingView = () => {
  return (
    <>
      <SocratesQuestionText text={'Does anything make it better or worse?'} />
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
                activeItem={'Exacerbating'}
                items={['Exacerbating', 'Relieving']}
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

export default ExacerbatingView;
