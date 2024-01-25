import React from 'react';
import {View} from 'react-native';
import AppLogo from '@/components/app-logo';
import {AppButton, AppLink} from '@/components/buttons';
import {AppHeader, AuthHeader, FormHeader} from '@/components/headers';
import {AppTextInput} from '@/components/inputs';
import {AppText} from '@/components/common';
import AppFormContainer from '@/components/common/app-form-container';
import {enterOtpStyles} from './styles';
import {ArrowLeftIcon} from '@/assets/svg';
import {routesNames} from '@/navigation/routes';
import AppScreen from '@/components/app-screen';

const Resend = () => {
  return (
    <>
      <View style={enterOtpStyles.resend}>
        <AppText text={"Didn't get a code?"} />
        <AppLink text="Click to resend" onPress={() => null} />
      </View>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EnterOtp = ({navigation}: any) => {
  return (
    <AppScreen isScrollable={false} paddingHorizontal={24}>
      <AuthHeader justLogo />
      <AppHeader
        paddingHorizontal={0}
        LeftContent={<ArrowLeftIcon />}
        paddingBottom={24}
      />
      <FormHeader
        title="Enter the OTP code"
        desc={
          'To confirm your account, enter the OTP code sent to someone@xyzmedicals.com'
        }
      />
      <AppFormContainer hasFlex>
        <AppTextInput placeholder="Enter OTP code" label="OTP code" />
        <AppButton
          onPress={() =>
            navigation.navigate(routesNames.AUTH_STACK, {
              screen: routesNames.CREATE_NEW_PASSWORD,
            })
          }
          text="Confirm code"
        />
        <Resend />
      </AppFormContainer>
      <AppLogo />
    </AppScreen>
  );
};

export default EnterOtp;
