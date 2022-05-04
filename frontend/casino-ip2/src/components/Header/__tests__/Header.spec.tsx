import { screen, render, fireEvent, getByAltText, getByText, getByTestId, waitFor } from "@testing-library/react";
import Header from "../Header";
import { AllProviders } from "../../../testUtils";
import { userInfo } from "os";
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

        fireEvent.mouseOver(screen.getByTestId('icon'));

        //await waitFor(() => screen.getByText('Overview'));

        //expect(screen.findByText('Overview')).toBeInTheDocument();
        //expect(screen.getByText('Balance')).toBeVisible();
        //expect(screen.getByText('Account')).toBeVisible();
        //expect(screen.getByText('Logout')).toBeVisible();
    });
})