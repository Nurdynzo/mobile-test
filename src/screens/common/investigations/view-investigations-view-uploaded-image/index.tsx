import {AppButton} from '@/components/buttons';
import {AppRow, AppText, DisplayImage} from '@/components/common';
import {AppContentSheet} from '@/components/sheets';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import {fs} from '@/resources/config';
import React from 'react';
import {View} from 'react-native';
import {investigationStyles} from '../styles';

const ViewInvestigationsUploadedImage = () => {
  const {openSheet, sheetRef} = useSheet();

  const {colors} = useColors();
  const styles = investigationStyles({colors});
  return (
    <>
      <AppButton
        isDisabled={false}
        onPress={openSheet}
        text="View"
        containerStyle={[styles.miniSaveBtn, styles.viewBtn]}
      />
      <AppContentSheet headerTitle="View uploaded images" sheetRef={sheetRef}>
        <View style={styles.mediaContainer}>
          <AppRow>
            <MediaPreview />
            <MediaPreview />
          </AppRow>
        </View>
      </AppContentSheet>
    </>
  );
};

export const MediaPreview = () => {
  const {colors} = useColors();
  const styles = investigationStyles({colors});

  return (
    <View style={styles.mediaPreview}>
      <DisplayImage size={140} borderRadius={5} />
      <View>
        <AppText text={'Img_04_12_22.jpg'} type={'body_1_semibold'} />
        <AppText
          text={'Uploaded by Dr Adepetun'}
          type={'body_1_semibold'}
          color="text300"
          style={{fontSize: fs(8)}}
        />
      </View>
    </View>
  );
};

export default ViewInvestigationsUploadedImage;
