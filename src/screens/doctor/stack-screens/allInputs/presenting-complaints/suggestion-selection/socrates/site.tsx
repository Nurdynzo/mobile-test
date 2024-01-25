import {AllInputsPillButton} from '@/components/buttons';
import {AllInputsSuggestionsInput} from '@/components/inputs';
import React from 'react';
import {SocratesQuestionText} from './common';
import AllInputsSuggestionsContainer from '@/components/all-inputs-suggestions-container';
import SuggestionSelectionLeadingView from '@/components/suggestion-selection-leading-view';

const SiteView = () => {
  return (
    <>
      <SocratesQuestionText text={'Where exactly is the pain?'} />
      <AllInputsSuggestionsInput
        suggestions={[{id: '', name: 'Left flank'}]}
        onPressPlusIcon={() => {}}
        onRemoveItem={_ => {}}
      />
      <AllInputsSuggestionsContainer
        leadingComponent={
          <SuggestionSelectionLeadingView onTapExpand={() => {}} />
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

export default SiteView;
