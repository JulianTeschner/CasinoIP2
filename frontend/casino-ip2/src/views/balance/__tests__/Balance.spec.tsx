import React from 'react';
import { render, screen } from '@testing-library/react';
import Balance from '../Balance';
import { AllProviders } from '../../../testUtils';

describe('logout view', () => {
    it('should render logout view', async () => {
      render(
        <AllProviders>
            <Balance />
        </AllProviders>);

      const headline = await screen.findByText('Balance');
      const btn = await screen.findByRole("button", {name: /Balance/i});

      expect(headline).toBeInTheDocument();
      expect(btn).toBeInTheDocument();

      btn.click();

      const logoutText = await screen.findByTestId('balance-text');
      expect(logoutText).toBeInTheDocument();
    });
})