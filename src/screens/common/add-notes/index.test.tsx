import {GeneralScreenProps} from '@/navigation/types';
import React from 'react';
import AddNotes from '.';
import {NavigationProp} from '@react-navigation/native';
import {renderWithProviders} from 'test-utils';

describe('AddNotes', () => {
  const navigationMock = {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    reset: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    canGoBack: jest.fn(),
    dangerouslyGetState: jest.fn(),
  } as unknown as NavigationProp<ReactNavigation.RootParamList, 'ADD_NOTES'>;
  const mockRoute = {
    key: 'ADD_NOTES_KEY',
    name: 'ADD_NOTES' as const,
    params: {patientId: 1, appointmentId: 1},
  };

  const mockProps: GeneralScreenProps<'ADD_NOTES'> = {
    route: mockRoute,
    navigation: navigationMock,
  };

  it('renders correctly', () => {
    const {getAllByText} = renderWithProviders(<AddNotes {...mockProps} />);
    const headerElements = getAllByText('Add notes');
    expect(headerElements[0]).toBeTruthy(); // This will target the first 'Add notes'
  });
});
