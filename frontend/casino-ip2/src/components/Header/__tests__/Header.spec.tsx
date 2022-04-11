import { screen, render } from "@testing-library/react";
import Header from "../Header";
import { AllProviders } from "../../../testUtils";

describe("Header", () => {
    it("render the header", async () => {
        render(
            <AllProviders>
                <Header />
            </AllProviders>
        );
        const header = await screen.getByText(/Casino/i);
        expect(header).toBeInTheDocument();
    })
})