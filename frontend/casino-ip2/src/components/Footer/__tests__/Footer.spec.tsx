import { screen, render } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
    it("render the footer", async () => {
        render(
            <>
                <Footer />
            </>
        );
        const footer = await screen.getByText(/Internetprogrammierung/i);
        expect(footer).toBeInTheDocument();
    });
});