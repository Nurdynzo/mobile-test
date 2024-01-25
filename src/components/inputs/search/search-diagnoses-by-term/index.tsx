import React, {FunctionComponent} from 'react';
import OverlaySearchTextInput from '../../overlay-search-text-input';
import {useSearchDiagnosisByTerm} from '@/hooks/diagnosis-term/useSearchDiagnosisByTerm';

const SearchDiagnosesByTermInput: FunctionComponent<{
  value: string;
  placeholder?: string;
  onSelectedItem: (props: {id: string; name: string}) => void;
  isLoading?: boolean;
}> = ({placeholder, onSelectedItem, value, isLoading}) => {
  const {
    searchText,
    setSearchText,
    searchResult = [],
    searchingForPatient,
  } = useSearchDiagnosisByTerm();
  return (
    <OverlaySearchTextInput
      data={searchResult.map(el => ({
        id: el.id as string,
        name: el.name as string,
        data: {id: el.id as string, name: el.name as string},
      }))}
      KeyExtractor={item => item.id}
      isFetchingData={isLoading ?? searchingForPatient}
      onChangeText={setSearchText}
      searchInputValue={searchText}
      value={value}
      height={48}
      autoFocus
      placeholder={placeholder}
      getSelectedItem={onSelectedItem}
      showIdInSearchResult={false}
    />
  );
};

export default SearchDiagnosesByTermInput;
