import React from 'react';
import AppLogo from '@/components/app-logo';
import {AppButton, AppLink} from '@/components/buttons';
import {AuthHeader} from '@/components/headers';
import {AppTextInput} from '@/components/inputs';
import {AppFormButtonWrapper} from '@/components/common';
import AppFormContainer from '@/components/common/app-form-container';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormFieldController} from '@/components/forms/form-field-controller';
import {routesNames} from '@/navigation/routes';
import AppScreen from '@/components/app-screen';
import {LoginSchema, loginSchema} from './type';
import useLogin from './use-login';
import {wp} from '@/resources/config';
import {EMPTY_STRING} from '@/utils/constants';

const defaultValues: LoginSchema = {
  emailAddress: EMPTY_STRING,
  password: EMPTY_STRING,
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LoginScreen = ({navigation}: any) => {
  const {control, handleSubmit} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {handleAuthentication, isLoading} = useLogin();

  return (
    <AppScreen
      isScrollable={false}
      paddingHorizontal={24}
      contentContainerStyle={{marginTop: wp(15.67)}}>
      <AuthHeader />
      <AppFormContainer>
        <FormFieldController
          name="emailAddress"
          control={control}
          Field={({onChange, value, onBlur}) => {
            return (
              <AppTextInput
                label="Email address"
                placeholder="Enter email address"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            );
          }}
        />
        <FormFieldController
          name="password"
          control={control}
          Field={({onChange, value, onBlur}) => {
            return (
              <AppTextInput
                isPassword
                placeholder="Enter password"
                label="Password"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
            );
          }}
        />
      </AppFormContainer>
      <AppFormButtonWrapper>
        <AppLink
          text="Forgot password?"
          onPress={() =>
            navigation.navigate(routesNames.AUTH_STACK, {
              screen: routesNames.RESET_PASSWORD,
            })
          }
        />
        <AppButton
          isLoading={isLoading}
          isDisabled={isLoading}
          onPress={handleSubmit(handleAuthentication)}
          text="Login"
        />
      </AppFormButtonWrapper>
      <AppLogo />
    </AppScreen>
  );
};

export default LoginScreen;
