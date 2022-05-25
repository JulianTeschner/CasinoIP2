import React from 'react';
import { render, screen } from '@testing-library/react';
import Logout from '../Logout';
import { AllProviders } from '../../../testUtils';

describe('logout view', () => {
    it('should render logout view', async () => {
      render(
        <AllProviders>
            <Logout />
        </AllProviders>);

      const headline = await screen.findByText('Logout');
      const btn = await screen.findByRole("button", {name: /Logout/i});

      expect(headline).toBeInTheDocument();
      expect(btn).toBeInTheDocument();

      btn.click();

      const logoutText = await screen.findByTestId('logout-text');
      expect(logoutText).toBeInTheDocument();
    });

    it('should clean the localStorage', async () => {
      render(
        <AllProviders>
            <Logout />
        </AllProviders>);

        const btn = await screen.findByRole("button", {name: /Logout/i});
        btn.click();
        
        jest.spyOn(window.localStorage.__proto__, 'removeItem');

        const btn1 = await screen.findByTestId("logout-button");
        btn1.click();
        expect(localStorage.removeItem).toBeCalled();
    });
})