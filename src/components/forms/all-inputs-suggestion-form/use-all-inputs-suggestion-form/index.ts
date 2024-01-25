import {SnowstormSimpleResponseDto} from '@/state/services/snowstorm';
import {EMPTY_STRING} from '@/utils/constants';
import {useState} from 'react';
import {AllInputsSuggestionFormHookType} from './type';

export const useAllInputsSuggestionForm = ({
  isSingleSelect,
}: {
  isSingleSelect?: boolean;
} = {}): AllInputsSuggestionFormHookType => {
  const [selectedItems, setSelectedItems] = useState<
    SnowstormSimpleResponseDto[]
  >([]);

  const [text, setText] = useState(EMPTY_STRING);

  const handleAddItem = (props: SnowstormSimpleResponseDto) => {
    if (!selectedItems.some(p => p.name === props.name)) {
      setSelectedItems(!isSingleSelect ? [...selectedItems, props] : [props]);
      setText(EMPTY_STRING);
    }
  };

  const handleRemoveItem = (props: SnowstormSimpleResponseDto) => {
    setSelectedItems(selectedItems.filter(p => p.name !== props.name));
  };

  const reset = () => {
    setSelectedItems([]);
    setText('');
  };

  return {
    selectedItems,
    setSelectedItems,
    text,
    setText,
    handleAddItem,
    handleRemoveItem,
    reset,
  };
};
