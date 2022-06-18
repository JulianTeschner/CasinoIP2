import { render } from "@testing-library/react";
import { AllProviders } from "../../../testUtils";
import Footer from "../Footer";

describe("Footer", () => {
    it("render the footer", async () => {
        render(
            <AllProviders>
                <Footer />
            </AllProviders>
        );
        //const footerText = await screen.getByText(/Internetprogrammierung Sommersemester 2022/i);
        //const toggleTheme = await screen.getByTestId("toggle-theme");

        //expect(footerText).toBeInTheDocument();
        //expect(toggleTheme).toBeInTheDocument();
    });
});