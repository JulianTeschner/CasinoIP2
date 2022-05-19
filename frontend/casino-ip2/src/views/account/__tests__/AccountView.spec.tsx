import React from 'react';
import { render, screen } from "@testing-library/react";
import Account from "../AccountView";
import { AllProviders } from '../../../testUtils';

describe("AboutUs", () => {
	it("it should render a headline", async () => {
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
      expect(accountText).toBeInTheDocument();
    });
});    