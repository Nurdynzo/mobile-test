import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {appContentSheetStyle} from './styles';
import {AppContentSheetProps} from './type';
import AppActivityIndicator from '@/components/app-activity-indicator';
import {useColors} from '@/hooks/useColors';
import AppSheet from '../app-sheet';
import {AppText} from '@/components/common';

const AppContentSheet: FunctionComponent<AppContentSheetProps> = ({
  sheetRef = null,
  closeSheet = () => null,
  headerTitle = 'Header Title',
  HeaderRightContent,
  onClose = () => null,
  onOpen,
  children,
  removeHeader,
  containerStyle,
  contentHeight,
  isLoading,
  FooterComponent,
  isScrollable = true,
  adjustToContentHeight = true,
}) => {
  const {colors} = useColors();
  const styles = appContentSheetStyle({colors});

  return (
    <AppSheet
      sheetRef={sheetRef}
      handlePosition="inside"
      adjustToContentHeight={adjustToContentHeight}
      enableSlideToClose
      onClose={onClose}
      onOpen={onOpen}
      onPressButton={closeSheet}
      onBackPress={closeSheet}
      overlayStyle={styles.overlay}
      modalStyle={styles.modal}
      childrenStyle={{height: contentHeight}}
      scrollViewProps={{
        scrollEnabled: isScrollable,
        contentContainerStyle: [styles.container, containerStyle],
        showsVerticalScrollIndicator: false,
      }}
      FooterComponent={FooterComponent}
      HeaderComponent={
        <View style={styles.titleContainer}>
          {!removeHeader && (
            <View style={styles.headerContent}>
              <AppText
                text={headerTitle}
                numberOfLines={1}
                type="title_semibold"
                color="text300"
              />
              {HeaderRightContent}
            </View>
          )}
        </View>
      }
      handleStyle={styles.handle}>
      {isLoading ? <AppActivityIndicator /> : children}
    </AppSheet>
  );
};

export default AppContentSheet;
