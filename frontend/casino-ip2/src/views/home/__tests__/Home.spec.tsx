import React from 'react';
import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe("Home", () => {
	it("renders a headline", async () => {
		render(<Home/>);

		const findHeadline = await screen.findByText(/Sign In/i);

		expect(findHeadline).toBeInTheDocument();
	});
});