import {AllInputsPillButton, AppButton} from '@/components/buttons';
import AllInputCollapsibleContent from '@/components/buttons/all-inputs-collapsible-content';
import {allInputsCollapsibleContentStyles} from '@/components/buttons/all-inputs-collapsible-content/styles';
import {AppText} from '@/components/common';
import {AllInputsSuggestionForm} from '@/components/forms';
import {useColors} from '@/hooks/useColors';
import {wp} from '@/resources/config';
import React from 'react';
import {View} from 'react-native';
import {commonStyles} from '../styles';
import {CollapsibleSiteCardProps} from './type';

//TODO(ZUCCI): Combine the different states here, to an enum.
const CollapsibleSiteCard = ({
  leadingLabel,
  title = 'Enter title',
  isSummary,
  isPreviewing = false,
  suggestions = [],
  formProps,
  selectedData = [],
  handleRemoveItem,
  shouldOpen,
  onPressSave,
  summaries,
  onToggle,
}: CollapsibleSiteCardProps) => {
  return (
    <>
      <AllInputCollapsibleContent
        shouldOpen={shouldOpen}
        onToggle={onToggle}
        title={title}
        children={
          !isSummary ? (
            <>
              {leadingLabel && (
                <AppText
                  type="subtitle_semibold"
                  color="text300"
                  text={leadingLabel}
                  style={{paddingBottom: wp(8)}}
                />
              )}

              {isPreviewing && (
                <Previewing
                  selectedData={selectedData}
                  handleRemoveItem={handleRemoveItem}
                />
              )}

              {!isPreviewing && (
                <Suggestions
                  suggestions={suggestions}
                  formProps={formProps}
                  onPressSave={onPressSave}
                />
              )}
            </>
          ) : (
            <>{summaries}</>
          )
        }
      />
    </>
  );
};

const Previewing: React.FC<CollapsibleSiteCardProps> = ({
  selectedData = [],
  handleRemoveItem = item => item,
}) => {
  const {colors} = useColors();
  const styles = commonStyles({colors});

  return (
    <View style={styles.pillContainer}>
      {selectedData.map((item, index) => (
        <AllInputsPillButton
          key={index}
          isSelected
          text={item?.name as string}
          onPress={() => handleRemoveItem(item)}
        />
      ))}
    </View>
  );
};

const Suggestions: React.FC<CollapsibleSiteCardProps> = ({
  suggestions = [],
  formProps,
  onPressSave,
}) => {
  const {colors} = useColors();
  const styles = allInputsCollapsibleContentStyles({colors});
  return (
    <>
      {formProps && (
        <>
          <AllInputsSuggestionForm
            expandSheetHeaderTitle=""
            formProps={formProps}
            suggestions={suggestions || []}
          />
          <AppButton
            text="Save"
            onPress={onPressSave}
            containerStyle={styles.save}
          />
        </>
      )}
    </>
  );
};

export default CollapsibleSiteCard;
