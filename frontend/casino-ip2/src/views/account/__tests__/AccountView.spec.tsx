import React from 'react';
import { render, screen } from "@testing-library/react";
import Account from "../AccountView";
import { AllProviders } from '../../../testUtils';
import axios from 'axios';

jest.mock("axios");
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe("AboutUs", () => {
  /*
	it("it should render the account overview", async () => {
        const res = {
            "user": {
              "first_name": "Max",
              "last_name": "Mustermann",
              "address.street": "Street",
              "address.city": "Stuttgart",
              "address.state": "Germany",
              "address.zip": "70174",
              "date_of_birth": "01.01.2000",
              "email": "max@mustermann.com"
          }
        };
          
        axios.mockResolvedValue({ data: res,
          status: 200,
          statusText: "OK",
          headers: {},
          config: {},
        });

		render(
			<AllProviders>
				<Account/>
			</AllProviders>
		);
        const headline = await screen.findByText('Account');
        const btn = await screen.findByRole("button", {name: /Account/i});

        expect(headline).toBeInTheDocument();
        expect(btn).toBeInTheDocument();

        btn.click();

        const accountText = await screen.findByTestId('account-text');
        const first = await screen.findByText(/First Name: Max/i);
        const last = await screen.findByText(/Last Name: Mustermann/i);
        const street = await screen.findByText(/Street: Street/i);
        const city = await screen.findByText(/City: Stuttgart/i);
        const state = await screen.findByText(/State: Germany/i);
        const zip = await screen.findByText(/ZIP: 70174/i);
        const birthday = await screen.findByText(/Birthday: 01.01.2000/i);
        const email = await screen.findByText(/Email: max@mustermann.com/i);

        expect(accountText).toBeInTheDocument();
        expect(first).toBeInTheDocument();
        expect(last).toBeInTheDocument();
        expect(street).toBeInTheDocument();
        expect(city).toBeInTheDocument();
        expect(state).toBeInTheDocument();
        expect(zip).toBeInTheDocument();
        expect(birthday).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    });
*/
    it('should show loading data because there is no connection', async () => {
        axios.mockRejectedValue({});
        render(
          <AllProviders>
				    <Account/>
			    </AllProviders>          
        );
        
        const btn = await screen.findByText('Account');
  
        btn.click();
  
        const loading = await screen.findByText("Loading Data...");
  
        expect(loading).toBeInTheDocument();
      });

      it('should delete account after button-click', async () => {
        axios.mockRejectedValue({});
        render(
          <AllProviders>
				    <Account/>
			    </AllProviders>          
        );
        
        const btn = await screen.findByText('Account');
  
        btn.click();
  
        const deleteBtn = await screen.findByText('Delete account!')
  
        expect(deleteBtn).toBeInTheDocument();

        deleteBtn.click();
      });

      it('should lock account after button-click', async () => {
        axios.mockRejectedValue({});
        render(
          <AllProviders>
				    <Account/>
			    </AllProviders>          
        );
        
        const btn = await screen.findByText('Account');
  
        btn.click();
  
        const lockBtn = await screen.findByText('Lock account!')
  
        expect(lockBtn).toBeInTheDocument();

        lockBtn.click();

        expect(setTimeout).toHaveBeenCalled();

      });
});    