import React, {Fragment, FunctionComponent} from 'react';
import {KeyboardAvoidingView, SafeAreaView, StatusBar} from 'react-native';
import {ScrollView, View} from 'react-native';
import {useColors} from '@/hooks/useColors';
import {isIOS, wp} from '@/resources/config';
import {appScreenStyles} from './styles';
import {AppScreenProps} from './type';

// TODO(Philip): Review the structure of this component with Zucci
/**
 * @param isScrollable defaults to true
 * @param disableSafeArea defaults to false
 */
const AppScreen: FunctionComponent<AppScreenProps> = ({
  children,
  isScrollable = true,
  disableSafeArea = false,
  ScreenHeader,
  scrollRef,
  paddingHorizontal,
  ...scrollViewProps
}) => {
  const {colors} = useColors();
  const Container = disableSafeArea ? View : SafeAreaView;
  const styles = appScreenStyles({colors});
  const horizontalPadding = wp(paddingHorizontal ?? 0);

  return (
    <Fragment>
      <StatusBar backgroundColor={colors?.default400} barStyle="dark-content" />
      <Container style={[styles.flex1, styles.screenBackground]}>
        <View
          style={[
            styles.flex1,
            // eslint-disable-next-line react-native/no-inline-styles
            {overflow: 'hidden'},
          ]}>
          {ScreenHeader}
          <KeyboardAvoidingView
            behavior={isIOS ? 'padding' : 'height'}
            style={[styles.flex1]}>
            {isScrollable ? (
              <ScrollView
                ref={scrollRef}
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={[
                  {paddingHorizontal: horizontalPadding},
                  scrollViewProps.contentContainerStyle,
                ]}
                {...scrollViewProps}>
                {children}
              </ScrollView>
            ) : (
              <>
                {
                  <View
                    style={[
                      styles.flex1,
                      {paddingHorizontal: horizontalPadding},
                      scrollViewProps.contentContainerStyle,
                    ]}>
                    {children}
                  </View>
                }
              </>
            )}
          </KeyboardAvoidingView>
        </View>
      </Container>
    </Fragment>
  );
};

export default AppScreen;
