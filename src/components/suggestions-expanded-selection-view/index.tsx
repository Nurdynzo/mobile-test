import {SearchIcon} from '@/assets/svg';
import AllInputsSuggestionsContainer from '@/components/all-inputs-suggestions-container';
import {AllInputsPillButton, AppButton} from '@/components/buttons';
import {AppTextInput} from '@/components/inputs';
import {AppContentSheet} from '@/components/sheets';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import {SnowstormSimpleResponseDto} from '@/state/services/snowstorm';
import React from 'react';
import {View} from 'react-native';
import SuggestionSelectionLeadingView from '../suggestion-selection-leading-view';
import {suggestionsExpandedSelectionViewStyles} from './styles';
import {useAddRemoveSuggestionInput} from './use-add-remove-suggestion-input';

const SuggestionsExpandedSelectionView = ({
  suggestions = [],
  initialSeletedSugestions,
  headerTitle = '',
  onSaveChanges,
  isSingleSelect,
}: {
  headerTitle: string;
  suggestions: SnowstormSimpleResponseDto[];
  initialSeletedSugestions: SnowstormSimpleResponseDto[];
  onSaveChanges: (data: SnowstormSimpleResponseDto[]) => void;
  isSingleSelect?: boolean;
}) => {
  const {colors} = useColors();
  const {openSheet, sheetRef, closeSheet} = useSheet();

  const styles = suggestionsExpandedSelectionViewStyles();
  const {
    handleQuery,
    queryText,
    handleOnPressItem,
    selectedItems,
    sugesstionsData,
    reset,
    initialize,
  } = useAddRemoveSuggestionInput({
    initialSeletedSugestions,
    suggestions,
    isSingleSelect,
  });
  return (
    <>
      <SuggestionSelectionLeadingView onTapExpand={openSheet} />
      <AppContentSheet
        sheetRef={sheetRef}
        onOpen={initialize}
        onClose={reset}
        headerTitle={headerTitle}>
        <View style={styles.sheetContent}>
          <AppTextInput
            value={queryText}
            onChangeText={handleQuery}
            placeholder={'Search suggestions'}
            autoFocus
            LeftContent={<SearchIcon stroke={colors.text300} />}
          />
          <AllInputsSuggestionsContainer height={334.4}>
            {sugesstionsData.map((item, index) => {
              return (
                <AllInputsPillButton
                  key={index}
                  text={`${item.name}`}
                  isSelected={selectedItems.some(el => el.name === item.name)}
                  onPress={() => handleOnPressItem(item)}
                />
              );
            })}
          </AllInputsSuggestionsContainer>
          <AppButton
            text="Save changes"
            onPress={() => {
              onSaveChanges(selectedItems);
              closeSheet();
            }}
          />
        </View>
      </AppContentSheet>
    </>
  );
};

export default SuggestionsExpandedSelectionView;
