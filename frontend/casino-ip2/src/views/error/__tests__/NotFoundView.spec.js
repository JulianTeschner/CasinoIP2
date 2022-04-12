import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import NotFound from "../NotFoundView";

describe("NotFoundView", () => {
    it("renders 'Not Found'", () => {
        render(
            <Router>
                <NotFound location={{ pathname: "error-call" }} />
            </Router>
        );

        const notFoundText = screen.getByText(/Not Found/i);
        expect(notFoundText).toBeInTheDocument();
    });
});