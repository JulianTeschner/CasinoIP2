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
      const btnDeposit = await screen.findByTestId('balance-button');
      const findFirstname = await screen.findByText('First Name');
		  const findLastname = await screen.findByText('Last Name');
      const findCredit = await screen.findByText('Creditcard-Number');
		  const findDeposit = await screen.findByTestId('deposit-deposit');

      expect(logoutText).toBeInTheDocument();
      expect(btnDeposit).toBeInTheDocument();
      expect(findFirstname).toBeInTheDocument();
      expect(findLastname).toBeInTheDocument();
      expect(findCredit).toBeInTheDocument();
      expect(findDeposit).toBeInTheDocument();
    });
})