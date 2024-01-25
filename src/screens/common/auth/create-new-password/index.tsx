import React from 'react';
import {View} from 'react-native';
import {ArrowLeftIcon, SuccessIcon} from '@/assets/svg';
import AppLogo from '@/components/app-logo';
import {AppButton} from '@/components/buttons';
import {AppHeader, AuthHeader, FormHeader} from '@/components/headers';
import {AppTextInput} from '@/components/inputs';
import {AppText} from '@/components/common';
import AppFormContainer from '@/components/common/app-form-container';
import {useSheet} from '@/hooks/useSheet';
import {createNewPasswordStyles} from './styles';
import AppContentSheet from '@/components/sheets/app-content-sheet';
import {routesNames} from '@/navigation/routes';
import AppScreen from '@/components/app-screen';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateNewPassword = ({navigation}: any) => {
  const {sheetRef, closeSheet, openSheet} = useSheet();
  return (
    <>
      <AppScreen isScrollable={false} paddingHorizontal={24}>
        <AuthHeader justLogo />
        <AppHeader
          paddingHorizontal={0}
          LeftContent={<ArrowLeftIcon />}
          paddingBottom={24}
        />
        <FormHeader
          title="Create new password"
          desc={'Please create new password and confirm the new password'}
        />
        <AppFormContainer hasFlex>
          <AppTextInput
            isPassword
            placeholder="Enter Password"
            label="New password"
          />
          <AppTextInput
            isPassword
            placeholder="Confirm password"
            label="Confirm password"
          />

          <AppButton onPress={openSheet} text="Reset password" />
        </AppFormContainer>
        <AppLogo />
      </AppScreen>
      <AppContentSheet removeHeader sheetRef={sheetRef}>
        <View style={createNewPasswordStyles().sheetContainer}>
          <SuccessIcon />
          <View style={createNewPasswordStyles().sheetTextWrapper}>
            <AppText
              type="title_semibold"
              color="text400"
              text="Congratulations"
              align="center"
            />
            <AppText
              type="subtitle_medium"
              color="text300"
              text="Your new password has been created successfully"
              align="center"
            />
          </View>
          <AppButton
            text="Return to login"
            onPress={() => {
              navigation.navigate(routesNames.AUTH_STACK, {
                screen: routesNames.LOGIN,
              });
              closeSheet();
            }}
          />
        </View>
      </AppContentSheet>
    </>
  );
};

export default CreateNewPassword;
