import React from 'react';
import { render, screen } from '@testing-library/react';
import Balance from '../Balance';
import { AllProviders } from '../../../testUtils';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

jest.mock("axios");

describe('balance view', () => {
    it('should render balance view', async () => {
      render(
        <AllProviders>
            <Balance />
        </AllProviders>);

      const headline = await screen.findByText('Balance');
      const btn = await screen.findByRole("button", {name: /Balance/i});

      expect(headline).toBeInTheDocument();
      expect(btn).toBeInTheDocument();

      btn.click();

      const balanceText = await screen.findByTestId('balance-text');
      const btnDeposit = await screen.findByTestId('balance-button');
      const findFirstname = await screen.findByText('First Name');
		  const findLastname = await screen.findByText('Last Name');
      const findCredit = await screen.findByText('Creditcard-Number');
		  const findDeposit = await screen.findByTestId('deposit-deposit');

      expect(balanceText).toBeInTheDocument();
      expect(btnDeposit).toBeInTheDocument();
      expect(findFirstname).toBeInTheDocument();
      expect(findLastname).toBeInTheDocument();
      expect(findCredit).toBeInTheDocument();
      expect(findDeposit).toBeInTheDocument();
    });

    it('should handle balance input error', async () => {
      axios.mockRejectedValue({});
      render(
        <AllProviders>
            <Balance />
        </AllProviders>);

      const headline = await screen.findByText('Balance');
      const btn = await screen.findByRole("button", {name: /Balance/i});

      expect(headline).toBeInTheDocument();
      expect(btn).toBeInTheDocument();

      btn.click();

      const balanceText = await screen.findByTestId('balance-text');
      const btnDeposit = await screen.findByTestId('balance-button');
      const findFirstname = await screen.findByLabelText('First Name');
		  const findLastname = await screen.findByLabelText('Last Name');
      const findCredit = await screen.findByLabelText('Creditcard-Number');
		  const findDeposit = await screen.findByLabelText('Deposit');

      expect(balanceText).toBeInTheDocument();
      expect(btnDeposit).toBeInTheDocument();
      expect(findFirstname).toBeInTheDocument();
      expect(findLastname).toBeInTheDocument();
      expect(findCredit).toBeInTheDocument();
      expect(findDeposit).toBeInTheDocument();

      userEvent.type(findFirstname, "First");
      userEvent.type(findLastname, "Last");
      userEvent.type(findCredit, "1234123412341234");
      userEvent.type(findDeposit, "20");
      btnDeposit.click();

      const text = await screen.findByText("First Name");

      await expect(text).toBeInTheDocument();
    });


})