import React, {useState} from 'react';
import AppIconButton from '@/components/buttons/app-icon-button';
import {ListLayoutIcon, MicrophoneIcon, TypeIcon} from '@/assets/svg';
import PresentingComplaintsTypeNoteView from './type-note';
import PresentingComplaintsSuggestionView from './suggestion-selection';
import {useColors} from '@/hooks/useColors';
import ScaffoldWithAnimatedHeader from '@/components/scaffolds/scaffold-with-back-button';
import {OverlaySearchTextInput} from '@/components/inputs';
import {OverlaySearchItem} from '@/components/inputs/overlay-search-text-input/type';
import useDebounce from '@/hooks/useDebounce';
import {useAppDispatch, useAppSelector} from '@/state/hooks';
import {
  useApiServicesAppSnowstormGetsymptombytermGetQuery,
  SnowstormSimpleResponseDto,
} from '@/state/services/snowstorm';
import {
  selectPresentingComplaintsSearchTerm,
  setPresentingComplaintsSearchTerm,
  setPresentingComplaintsSelectedResult,
} from '@/state/slices/all-inputs/presenting-complaints/presentingComplaintsSearchBar';
import {EMPTY_STRING} from '@/utils/constants';
import {View} from 'react-native';
import {presentingComplaintsSuggestionSelectionStyles} from './suggestion-selection/styles';
import {ScrollableTab} from '@/components/tabs';
import * as Constants from '@/constants/index';
import AppButton from '@/components/buttons/app-button';

const PresentingComplaintsScreen = () => {
  const [isSuggestionsView, setView] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const {colors} = useColors();
  const styles = presentingComplaintsSuggestionSelectionStyles();

  return (
    <ScaffoldWithAnimatedHeader
      screenTitle={'Presenting complaints'}
      AppHeaderRightContent={
        <AppIconButton
          icon={
            isSuggestionsView ? (
              <TypeIcon />
            ) : (
              <ListLayoutIcon fill={colors.primary400} />
            )
          }
          onPress={() => {
            setView(value => !value);
          }}
        />
      }
      AdditionalHeaderContent={
        <>
          {isSuggestionsView ? (
            <>
              <SearchBarAndAudioButtonView />

              <ScrollableTab
                style={styles.tabButtonScrollViewContainer}
                onPress={setActiveTab}
                tabs={Constants.socratesTabLabels}
                currentIndex={activeTab}
                tabButtonStyle={styles.tabButtons}
                tabButtonScrollViewStyle={styles.tabButtonScrollView}
              />
            </>
          ) : (
            <AppButton
              height={40}
              width={undefined}
              buttonColor={'white'}
              text={'Record audio'}
              textColor={'primary400'}
              LeftContent={<MicrophoneIcon />}
              containerStyle={styles.typeNotesHeader}
            />
          )}
        </>
      }>
      {isSuggestionsView ? (
        <PresentingComplaintsSuggestionView activeTab={activeTab} />
      ) : (
        <PresentingComplaintsTypeNoteView />
      )}
    </ScaffoldWithAnimatedHeader>
  );
};

export default PresentingComplaintsScreen;

const SearchBarAndAudioButtonView = () => {
  const styles = presentingComplaintsSuggestionSelectionStyles();
  return (
    <View style={styles.searchBarAndAudioButtonContainer}>
      <SearchBarView />
      <AppIconButton height={40} width={40} icon={<MicrophoneIcon />} />
    </View>
  );
};

const SearchBarView = () => {
  const dispatch = useAppDispatch();
  const searchText = useAppSelector(selectPresentingComplaintsSearchTerm);
  const debouncedSearchTerm = useDebounce({
    value: searchText,
  });

  const {data: searchResult, isFetching} =
    useApiServicesAppSnowstormGetsymptombytermGetQuery(
      {
        searchTerm: debouncedSearchTerm,
      },
      {
        skip: searchText === EMPTY_STRING || searchText.length <= 3,
      },
    );

  return (
    <OverlaySearchTextInput
      autoFocus
      baseInputFlex={1}
      placeholder={'Search complaints'}
      searchInputValue={searchText}
      isFetchingData={isFetching}
      onChangeText={value => {
        dispatch(setPresentingComplaintsSearchTerm(value));
      }}
      getSelectedItem={item => {
        dispatch(setPresentingComplaintsSearchTerm(item.name || EMPTY_STRING));
        dispatch(setPresentingComplaintsSelectedResult(item));
      }}
      data={[
        ...(searchResult?.map(data => {
          return {
            id: data.id,
            name: data.name,
            data: data,
          } as OverlaySearchItem<SnowstormSimpleResponseDto>;
        }) ?? []),
      ]}
    />
  );
};
