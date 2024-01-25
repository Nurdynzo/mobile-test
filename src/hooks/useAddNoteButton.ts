import {AddNotesButtonState} from '@/types/addNoteButtonState';
import {useState} from 'react';

const useAddNoteButton = (initialState?: AddNotesButtonState) => {
  const [state, setButtonState] = useState<AddNotesButtonState>(
    initialState ?? AddNotesButtonState.close,
  );

  const onOpen = () => {
    setButtonState(AddNotesButtonState.open);
  };
  const onClose = () => {
    setButtonState(AddNotesButtonState.close);
  };

  return {state, onOpen, onClose};
};

export default useAddNoteButton;
