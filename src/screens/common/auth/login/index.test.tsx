import {renderWithProviders} from '../../../../../test-utils';
import React from 'react';
import {LoginScreen} from '@/screens/common/auth';
import {fireEvent, waitFor} from '@testing-library/react-native';
import {routesNames} from '@/navigation/routes';
import {AuthStatus} from '@/state/slices/auth/type';

describe('login screen', () => {
  it('renders email input label', () => {
    const {getByText} = renderWithProviders(<LoginScreen />);
    expect(getByText('Email address')).toBeOnTheScreen();
  });

  it('renders email input', () => {
    const {getByPlaceholderText} = renderWithProviders(<LoginScreen />);
    expect(getByPlaceholderText('Enter email address')).toBeOnTheScreen();
  });

  it('renders password input label', () => {
    const {getByText} = renderWithProviders(<LoginScreen />);
    expect(getByText('Password')).toBeOnTheScreen();
  });

  it('renders password input', () => {
    const {getByPlaceholderText} = renderWithProviders(<LoginScreen />);
    expect(getByPlaceholderText('Enter password')).toBeOnTheScreen();
  });

  it('renders forgot password link-button', () => {
    const {getByText} = renderWithProviders(<LoginScreen />);
    expect(getByText('Forgot password?')).toBeOnTheScreen();
  });

  it('renders login button', () => {
    const {getByText} = renderWithProviders(<LoginScreen />);
    expect(getByText('Login')).toBeOnTheScreen();
  });

  it('navigates to forgot password screen', async () => {
    // mock navigate method
    const navigate = jest.fn();

    const {getByText} = renderWithProviders(
      <LoginScreen navigation={{navigate}} />,
    );

    const forgotPasswordButton = getByText('Forgot password?');

    await waitFor(() => {
      fireEvent.press(forgotPasswordButton);
    });

    // Asserting screen navigate
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(routesNames.AUTH_STACK, {
      screen: routesNames.RESET_PASSWORD,
    });
  });

  it('given an invalid email should show error on email input', async () => {
    const {getByText, getByPlaceholderText} = renderWithProviders(
      <LoginScreen />,
    );

    const email = 'admin@';
    const password = 'password';

    const emailField = getByPlaceholderText('Enter email address');
    const passwordField = getByPlaceholderText('Enter password');
    const loginButton = getByText('Login');

    expect(emailField).toBeOnTheScreen();
    expect(passwordField).toBeOnTheScreen();
    expect(loginButton).toBeOnTheScreen();

    await waitFor(() => {
      fireEvent.changeText(emailField, email);
      fireEvent.changeText(passwordField, password);
      fireEvent.press(loginButton);
    });

    await waitFor(() => {
      expect(emailField.props.value).toBe(email);
      expect(passwordField.props.value).toBe(password);
      expect(getByText('Invalid email')).toBeOnTheScreen();
    });
  });

  it('given valid email and password should log user in', async () => {
    const {getByText, getByPlaceholderText, store} = renderWithProviders(
      <LoginScreen />,
    );

    const emailField = getByPlaceholderText('Enter email address');
    const passwordField = getByPlaceholderText('Enter password');
    const loginButton = getByText('Login');

    await waitFor(() => {
      fireEvent.changeText(emailField, 'okhaephilip2+2@gmail.com');
      fireEvent.changeText(passwordField, 'Password!');

      fireEvent.press(loginButton);
    });

    await waitFor(() => {
      expect(store.getState().auth.status).toBe(AuthStatus.loggedIn);
    });
  });
});
