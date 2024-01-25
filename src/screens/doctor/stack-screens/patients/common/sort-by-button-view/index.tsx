import React from 'react';
import VoidFunction from '@/types/voidfunction';
import {ModalizeSheetRef} from '@/types/sheet';
import {onSelectItemProp} from '@/components/sheets/app-menu-sheet/type';
import {useColors} from '@/hooks/useColors';
import {AppLink, AppTouchButton} from '@/components/buttons';
import {
  DownCaretIcon,
  RadioBtnEmptyIcon,
  RadioBtnFilledIcon,
  SortDown,
} from '@/assets/svg';
import {AppMenuSheet} from '@/components/sheets';
import * as Constant from '@/constants/index';

export const SortByButtonView = ({
  openSortBySheet,
  sheetRef,
  reset,
  selectedValue,
  onSelectItem,
}: {
  openSortBySheet?: VoidFunction;
  reset?: VoidFunction;
  sheetRef?: ModalizeSheetRef;
  onSelectItem?: onSelectItemProp;
  selectedValue?: string;
}) => {
  const {colors} = useColors();
  return (
    <>
      <AppTouchButton
        height={48}
        onPress={openSortBySheet}
        text="Sort by"
        rightIcon={<DownCaretIcon stroke={colors.primary400} />}
        leftIcon={<SortDown />}
      />
      <AppMenuSheet
        title="Sort by"
        sheetRef={sheetRef}
        selectedValue={selectedValue}
        onSelectItem={onSelectItem}
        HeaderRightContent={<AppLink text="Reset" onPress={reset} />}
        renderRightIcon={({isSelected}) =>
          isSelected ? <RadioBtnFilledIcon /> : <RadioBtnEmptyIcon />
        }
        menuOptions={Constant.sortByOptions}
      />
    </>
  );
};
