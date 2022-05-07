import React from 'react';
import { render, screen } from '@testing-library/react';
import WinLoss from '../WinLoss';

describe('win/loss overview', () => {
    it('should render the heading, amount, lastdeposit and difference', async () => {
      const fetchrespone = {
        "balance": {
          "Amount": 100,
          "LastDeposit": 50
      }};
      
      global.fetch = jest.fn().mockReturnValue(Promise.resolve({
        json: () => Promise.resolve(fetchrespone)
      }));
      
      render(<WinLoss />);

      const btn = await screen.findByText('Show Win/Loss Overview');

      btn.click();

      const amount = await screen.findByText('Current amount: 100');
      const lastdeposit = await screen.findByText('Last deposit: 50');
      const difference = await screen.findByText('Difference: 50');
      const header = await screen.findByText('Win-Loss Overview');

      expect(header).toBeInTheDocument();
      expect(amount).toBeInTheDocument();
      expect(lastdeposit).toBeInTheDocument();
      expect(difference).toBeInTheDocument();
    });
})