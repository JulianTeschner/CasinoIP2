import { render, screen } from "@testing-library/react";
import RequireAuth from "../RequireAuth";
import { AllProviders } from "../../../testUtils";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Navigate: () => <p>navigate</p>
}));

describe("RequireAuth", () => {
    it("Send to login if not logged in", async () => {
        render(
            <AllProviders>
                <RequireAuth isLoggedIn={false} />
            </AllProviders>
        );
        const headline = await screen.findByText(/navigate/i);
        expect(headline).toBeInTheDocument();
    });

    it("show page if logged in", async () => {
        render(
            <AllProviders>
                <RequireAuth isLoggedIn>
                    <h1>Overview</h1>
                </RequireAuth>
            </AllProviders>
        );
        const headline = await screen.findByText(/Overview/i);
        expect(headline).toBeInTheDocument();
    })
})