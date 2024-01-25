import AllInputsSuggestionsContainer from '@/components/all-inputs-suggestions-container';
import {AllInputsPillButton} from '@/components/buttons';
import {AllInputsSuggestionsInput} from '@/components/inputs';
import SuggestionsExpandedSelectionView from '@/components/suggestions-expanded-selection-view';
import {EMPTY_STRING} from '@/utils/constants';
import React, {FunctionComponent} from 'react';
import {AllInputsSuggestionFormProps} from './types';

const AllInputsSuggestionForm: FunctionComponent<
  AllInputsSuggestionFormProps
> = ({
  formProps,
  suggestions,
  ContentInBetweenSuggesstionsFields,
  expandSheetHeaderTitle,
  isSingleSelect,
  ActionBtnContent,
  showTextInput = true,
  extraBaseContainerStyle,
  showRightView = true,
}) => {
  const {
    text,
    selectedItems,
    handleAddItem,
    handleRemoveItem,
    setSelectedItems,
    setText,
  } = formProps;

  return (
    <>
      <AllInputsSuggestionsInput
        showRightView={showRightView}
        extraBaseContainerStyle={extraBaseContainerStyle}
        showTextInput={showTextInput}
        marginBottom={8}
        suggestions={selectedItems}
        textValue={text}
        ActionBtnContent={ActionBtnContent}
        disablePlusBtn={!text.trim()}
        onChangeText={setText}
        onPressPlusIcon={() => {
          handleAddItem({id: null, name: text});
          setText(EMPTY_STRING);
        }}
        onRemoveItem={handleRemoveItem}
      />
      {ContentInBetweenSuggesstionsFields}
      <AllInputsSuggestionsContainer
        leadingComponent={
          <SuggestionsExpandedSelectionView
            headerTitle={expandSheetHeaderTitle}
            initialSeletedSugestions={selectedItems}
            suggestions={suggestions}
            onSaveChanges={setSelectedItems}
            isSingleSelect={isSingleSelect}
          />
        }>
        {suggestions.map((item, index) => (
          <AllInputsPillButton
            key={index}
            text={`${item?.name}`}
            onPress={() => handleAddItem(item)}
          />
        ))}
      </AllInputsSuggestionsContainer>
    </>
  );
};

export default AllInputsSuggestionForm;
