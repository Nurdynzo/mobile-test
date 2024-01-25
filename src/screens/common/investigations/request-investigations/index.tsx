import AllInputsSuggestionsContainer from '@/components/all-inputs-suggestions-container';
import {
  AllInputsAddNotesButton,
  AllInputsPillButton,
  AppButton,
} from '@/components/buttons';
import {AllInputsPanelWithTitleCard} from '@/components/cards';
import {AllInputsSuggestionsInput} from '@/components/inputs';
import {AppTabComponent} from '@/components/tabs/tab-switch';
import AppTabSwitcher from '@/components/tabs/tabs-switcher';
import {recentResultsTabsForInvestigations} from '@/constants/investigations';
import {tabsForProcedures} from '@/constants/procedures';
import useAddNoteButton from '@/hooks/useAddNoteButton';
import {useColors} from '@/hooks/useColors';
import {wp} from '@/resources/config';
import {EMPTY_STRING} from '@/utils/constants';
import React, {useState} from 'react';
import {View} from 'react-native';
import {TabNamesTypes} from '../../../doctor/stack-screens/allInputs/procedures/types';
import {investigationStyles} from '../styles';
import SuggestionSelectionLeadingView from '@/components/suggestion-selection-leading-view';

const RequestInvestigations = () => {
  const [activeTab, setActiveTab] = useState<TabNamesTypes>(
    tabsForProcedures[0].title as TabNamesTypes,
  );

  const {colors} = useColors();
  const styles = investigationStyles({colors});
  const addNotesButtonState = useAddNoteButton();

  return (
    <View style={{gap: wp(10)}}>
      <AppTabComponent
        tabs={recentResultsTabsForInvestigations}
        activeTab={activeTab}
        setActiveTab={tabKey => setActiveTab(tabKey as TabNamesTypes)}
      />
      <AllInputsPanelWithTitleCard title={'Request investigations'}>
        <View style={styles.tabWrapper}>
          <AppTabComponent
            extraStyles={{
              maxWidth: '50%',
            }}
            tabs={[
              {key: '2', title: 'Test'},
              {key: '1', title: 'Specimen'},
            ]}
            activeTab={activeTab}
            setActiveTab={tabKey => setActiveTab(tabKey as TabNamesTypes)}
          />
          <AppTabSwitcher
            extraStyles={{
              maxWidth: '50%',
            }}
            tabs={[{name: 'Regular'}, {name: 'Urgent'}]}
          />
          <View>
            <AllInputsSuggestionsInput
              suggestions={[{id: EMPTY_STRING, name: 'Left flank'}]}
              onPressPlusIcon={() => {}}
              onRemoveItem={_ => {}}
            />
            <AllInputsSuggestionsContainer
              leadingComponent={
                <SuggestionSelectionLeadingView onTapExpand={() => {}} />
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
          </View>
          <AllInputsAddNotesButton
            addButtonLabel={'Add investigation notes'}
            buttonState={addNotesButtonState}
            buttonStyle={styles.addNotesButton}
          />
          <AppButton
            text="Save"
            onPress={() => null}
            containerStyle={styles.miniSaveBtn}
          />
        </View>
      </AllInputsPanelWithTitleCard>
    </View>
  );
};

export default RequestInvestigations;
