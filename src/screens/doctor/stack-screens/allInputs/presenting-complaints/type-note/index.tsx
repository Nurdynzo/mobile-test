import CollapsibleNoteEntryView from '@/components/inputs/collapsible-note-entry-view';
import {AppButton} from '@/components/buttons';
import React from 'react';
import {presentingComplaintsTypeNotesStyles} from './styles';

const PresentingComplaintsTypeNoteView = () => {
  const styles = presentingComplaintsTypeNotesStyles();
  return (
    <>
      <CollapsibleNoteEntryView
        marginTop={0}
        name={'History of presenting complaints'}
      />
      <CollapsibleNoteEntryView name={'Past medical history'} />
      <CollapsibleNoteEntryView name={'Family history'} />
      <CollapsibleNoteEntryView name={'Social history'} />
      <CollapsibleNoteEntryView name={'Other history'} />

      <AppButton isDisabled text={'Save'} containerStyle={styles.saveButton} />
    </>
  );
};

export default PresentingComplaintsTypeNoteView;
