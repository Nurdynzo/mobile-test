import {renderWithProviders} from '../../../../../../../test-utils';
import React from 'react';
import {PrescribeMedicationView} from '@/screens/doctor/stack-screens/allInputs/prescription/prescribe-medication';

describe('Prescribe Medication screen', () => {
  it('renders Prescribe medication title', () => {
    const {getByText} = renderWithProviders(
      <PrescribeMedicationView patientId={1990} />,
    );
    expect(getByText('Prescribe medication')).toBeOnTheScreen();
  });
});
