import AllInputsSuggestionsContainer from '@/components/all-inputs-suggestions-container';
import {AllInputsPillButton} from '@/components/buttons';
import {AppTabComponent} from '@/components/tabs/tab-switch';
import {recentResultsTabsForInvestigations} from '@/constants/investigations';
import {useColors} from '@/hooks/useColors';
import React, {useState} from 'react';
import {View} from 'react-native';
import InvestigationRecordResults from '../investigations-record-results';
import {investigationStyles} from '../styles';
import {InvestigationTabNamesTypes} from '../types';
import {wp} from '@/resources/config';
import {EMPTY_STRING} from '@/utils/constants';
import SuggestionSelectionLeadingView from '@/components/suggestion-selection-leading-view';

const RecordInvestigations = () => {
  const [activeTab, setActiveTab] = useState<InvestigationTabNamesTypes>(
    recentResultsTabsForInvestigations[0].title as InvestigationTabNamesTypes,
  );
  const {colors} = useColors();
  const styles = investigationStyles({colors});
  return (
    <>
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
      <View style={{gap: wp(20)}}>
        <AppTabComponent
          tabs={recentResultsTabsForInvestigations}
          activeTab={activeTab}
          setActiveTab={tabKey =>
            setActiveTab(tabKey as InvestigationTabNamesTypes)
          }
        />
        <View style={styles.recentResultContainer}>
          <InvestigationRecordResults />
        </View>
      </View>
    </>
  );
};

export default RecordInvestigations;
