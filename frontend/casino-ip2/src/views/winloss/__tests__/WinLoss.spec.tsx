import React from 'react';
import { render, screen } from '@testing-library/react';
import WinLoss from '../WinLoss';
import axios from "axios";

jest.mock("axios");

describe('win/loss overview', () => {
  
    it('should render the heading, amount, lastdeposit and difference', async () => {
      const res = {
        "balance": {
          "Amount": 100,
          "LastDeposit": 50
        }};
        
      axios.mockResolvedValue({ data: res,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });
      
      render(<WinLoss />);

      const btn = await screen.findByText('Win/Loss Overview');

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

    it('should show loading data because there is no connection', async () => {      
      axios.mockRejectedValue({})
      
      render(<WinLoss />);
      
      const btn = await screen.findByText('Win/Loss Overview');

      btn.click();

      const loading = await screen.findByText("Loading Data...");

      expect(loading).toBeInTheDocument();
    })
})