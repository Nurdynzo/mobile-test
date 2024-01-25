import React from 'react';
import VoidFunction from '@/types/voidfunction';
import {ModalizeSheetRef} from '@/types/sheet';
import {onSelectItemProp} from '@/components/sheets/app-menu-sheet/type';
import {MenuOptionsProp} from '@/types/menusheet';
import {useColors} from '@/hooks/useColors';
import {AppTouchButton} from '@/components/buttons';
import {
  DownCaretIcon,
  RadioBtnEmptyIcon,
  RadioBtnFilledIcon,
} from '@/assets/svg';
import {AppMenuSheet} from '@/components/sheets';

export const CommonMenuView = ({
  openSheet,
  sheetRef,
  selectedValue,
  onSelectItem,
  menuOptions,
  showSearchInput,
  buttonText,
  sheetTitle,
}: {
  buttonText: string;
  sheetTitle: string;
  showSearchInput: boolean;
  openSheet?: VoidFunction;
  sheetRef?: ModalizeSheetRef;
  onSelectItem?: onSelectItemProp;
  selectedValue?: string;
  menuOptions?: MenuOptionsProp;
}) => {
  const {colors} = useColors();
  return (
    <>
      <AppTouchButton
        height={48}
        onPress={openSheet}
        text={buttonText}
        color="text400"
        rightIcon={<DownCaretIcon stroke={colors.text400} />}
      />
      <AppMenuSheet
        title={sheetTitle}
        sheetRef={sheetRef}
        menuOptions={menuOptions}
        selectedValue={selectedValue}
        renderRightIcon={({isSelected}) =>
          isSelected ? <RadioBtnFilledIcon /> : <RadioBtnEmptyIcon />
        }
        showSearchInput={showSearchInput}
        onSelectItem={onSelectItem}
      />
    </>
  );
};
