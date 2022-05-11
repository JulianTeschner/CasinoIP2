import React from 'react';
import { screen, render, fireEvent, getByAltText, getByText, getByTestId, waitFor } from "@testing-library/react";
import Header from "../Header";
import '@testing-library/jest-dom';
import { AllProviders } from "../../../testUtils";
import userEvent from "@testing-library/user-event";

describe("Header", () => {
    it("should render the header", async () => {
        render(
            <AllProviders>
                <Header />
            </AllProviders>
        );
        const header = await screen.getByText(/Casino/i);
        
        expect(header).toBeInTheDocument();
    });

    it("should render the dropdown-icon", async () => {
        render(
            <AllProviders>
                <Header />
            </AllProviders>
        );

        fireEvent.mouseOver(screen.getByTestId('icon'));
        
        await waitFor(() => screen.getByTestId('dropdown-menu'));
        expect(screen.getByTestId('icon')).toBeVisible();
    });
    
    it("should render the dropdown-menu", async () => {
        render(
            <AllProviders>
                <Header />
            </AllProviders>
        );

        const menuIcon = await screen.findByTestId('icon');
        
        userEvent.hover(menuIcon);
        
        //const balance = await screen.getByText(/Balance/i);
        //const account = await screen.getByText(/Account/i);
        //const logout = await screen.getByText(/Logout/i);

        //fireEvent.mouseOver(screen.getByTestId('icon'));

        //await waitFor(() => screen.getByText('Overview'));
        
        //expect(balance).toBeInTheDocument();
        //expect(account).toBeVisible();
        //expect(logout).toBeVisible();
    });
})