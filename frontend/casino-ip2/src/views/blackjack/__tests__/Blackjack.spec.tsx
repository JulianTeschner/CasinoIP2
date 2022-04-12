import React from 'react';
import { render, screen } from "@testing-library/react";
import Blackjack from "../Blackjack";

// TODO: add tests
describe("Home", () => {
	it("renders a headline", async () => {
		render(<Blackjack/>);

		const findImageLeft = await screen.findByTestId('image-left');
		const findHeadline = await screen.findByText(/Sign In/i);
		const findImageRight = await screen.findByTestId('image-right');

		expect(findImageLeft).toBeInTheDocument();
		expect(findHeadline).toBeInTheDocument();
		expect(findImageRight).toBeInTheDocument();
	});
});