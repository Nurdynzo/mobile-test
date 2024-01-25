import React from 'react';
import {AppIconButton} from '@/components/buttons';
import {useSheet} from '@/hooks/useSheet';
import {AppContentSheet, AppImageUploadSheet} from '@/components/sheets';
import {CameraIcon} from '@/assets/svg';

export const MediaPreview = () => {
  return <></>;
};

const InvestigationCamera = () => {
  const {openSheet: openInvestigationSheet, sheetRef: investigationSheetRef} =
    useSheet();
  return (
    <>
      <AppIconButton
        buttonColor={'text50'}
        borderColor="transparent"
        icon={<CameraIcon />}
        onPress={openInvestigationSheet}
      />
      <AppContentSheet
        headerTitle="View upload images"
        sheetRef={investigationSheetRef}>
        <AppImageUploadSheet />
      </AppContentSheet>
    </>
  );
};

export default InvestigationCamera;
