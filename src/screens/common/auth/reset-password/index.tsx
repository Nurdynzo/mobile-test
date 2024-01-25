import React from 'react';
import AppLogo from '@/components/app-logo';
import {AppButton} from '@/components/buttons';
import {AppHeader, AuthHeader, FormHeader} from '@/components/headers';
import {AppTextInput} from '@/components/inputs';
import AppFormContainer from '@/components/common/app-form-container';
import {ArrowLeftIcon} from '@/assets/svg';
import {routesNames} from '@/navigation/routes';
import AppScreen from '@/components/app-screen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResetPassword = ({navigation}: any) => {
  return (
    <AppScreen isScrollable={false} paddingHorizontal={24}>
      <AuthHeader justLogo />
      <AppHeader
        paddingHorizontal={0}
        LeftContent={<ArrowLeftIcon />}
        paddingBottom={24}
      />
      <FormHeader
        title="Reset password"
        desc="Enter your email address below and we will send you a password reset OTP"
      />
      <AppFormContainer hasFlex>
        <AppTextInput placeholder="Enter Email address" label="Email address" />
        <AppButton
          isDisabled={false}
          onPress={() =>
            navigation.navigate(routesNames.AUTH_STACK, {
              screen: routesNames.ENTER_OTP,
            })
          }
          text="Send reset OTP"
        />
      </AppFormContainer>
      <AppLogo />
    </AppScreen>
  );
};

export default ResetPassword;
