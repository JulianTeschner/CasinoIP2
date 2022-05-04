import { screen, render } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
    it("render the footer", async () => {
        render(
            <>
                <Footer />
            </>
        );
        const footer = await screen.getByText(/Internetprogrammierung Sommersemester 2022/i);
        expect(footer).toBeInTheDocument();
    });
});