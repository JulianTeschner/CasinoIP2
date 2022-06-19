import React from 'react';
import { render, screen } from '@testing-library/react';
import Balance from '../Balance';
import { AllProviders } from '../../../testUtils';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { EmailJSResponseStatus } from 'emailjs-com';

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

      const findTab = await screen.findByText('Pay off');
      findTab.click();

      const balanceTextOff = await screen.findByTestId('balance-text-off');
      const btnDepositOff = await screen.findByTestId('balance-button-off');
      const findFirstnameOff = await screen.findByTestId('deposit-first-off');
		  const findLastnameOff = await screen.findByTestId('deposit-last-off');
      const findCreditOff = await screen.findByTestId('deposit-number-off');
		  const findDepositOff = await screen.findByTestId('deposit-deposit-off');

      expect(balanceTextOff).toBeInTheDocument();
      expect(btnDepositOff).toBeInTheDocument();
      expect(findFirstnameOff).toBeInTheDocument();
      expect(findLastnameOff).toBeInTheDocument();
      expect(findCreditOff).toBeInTheDocument();
      expect(findDepositOff).toBeInTheDocument();
    });

    it('should handle balance in input error', async () => {
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

    it('should handle balance off input error', async () => {
      axios.mockRejectedValue({});
      render(
        <AllProviders>
            <Balance />
        </AllProviders>);

      const btn = await screen.findByRole("button", {name: /Balance/i});

      expect(btn).toBeInTheDocument();

      btn.click();

      const findTab = await screen.findByText('Pay off');
      findTab.click();

      const balanceTextOff = await screen.findByTestId('balance-text-off');
      const btnDepositOff = await screen.findByTestId('balance-button-off');
      const findFirstnameOff = await screen.findByTestId('deposit-first-off');
		  const findLastnameOff = await screen.findByTestId('deposit-last-off');
      const findCreditOff = await screen.findByTestId('deposit-number-off');
		  const findDepositOff = await screen.findByTestId('deposit-deposit-off');

      expect(balanceTextOff).toBeInTheDocument();
      expect(btnDepositOff).toBeInTheDocument();
      expect(findFirstnameOff).toBeInTheDocument();
      expect(findLastnameOff).toBeInTheDocument();
      expect(findCreditOff).toBeInTheDocument();
      expect(findDepositOff).toBeInTheDocument();

      userEvent.type(findFirstnameOff, "First");
      userEvent.type(findLastnameOff, "Last");
      userEvent.type(findCreditOff, "1234123412341234");
      userEvent.type(findDepositOff, "20");
      btnDepositOff.click();

      const text = await screen.findByTestId("balance-text-off");

      await expect(text).toBeInTheDocument();
    });

    it('should handle balance off input error', async () => {
      
      const mockSetGuthaben = jest.fn();

        jest.mock('react', () => ({
            useState: (guthaben:any) => [guthaben, mockSetGuthaben]
        }))

      render(
        <AllProviders>
            <Balance />
        </AllProviders>);

      const btn = await screen.findByRole("button", {name: /Balance/i});

      expect(btn).toBeInTheDocument();

      btn.click();

      const findTab = await screen.findByText('Pay off');
      findTab.click();

      const balanceTextOff = await screen.findByTestId('balance-text-off');
      const btnDepositOff = await screen.findByTestId('balance-button-off');
      const findFirstnameOff = await screen.findByTestId('deposit-first-off');
		  const findLastnameOff = await screen.findByTestId('deposit-last-off');
      const findCreditOff = await screen.findByTestId('deposit-number-off');
		  const findDepositOff = await screen.findByTestId('deposit-deposit-off');

      expect(balanceTextOff).toBeInTheDocument();
      expect(btnDepositOff).toBeInTheDocument();
      expect(findFirstnameOff).toBeInTheDocument();
      expect(findLastnameOff).toBeInTheDocument();
      expect(findCreditOff).toBeInTheDocument();
      expect(findDepositOff).toBeInTheDocument();

      userEvent.type(findFirstnameOff, "First");
      userEvent.type(findLastnameOff, "Last");
      userEvent.type(findCreditOff, "1234123412341234");
      userEvent.type(findDepositOff, "20");
      btnDepositOff.click();

      expect(mockSetGuthaben).toHaveBeenCalled;
    });

})