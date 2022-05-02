import React from 'react';
import { render, screen } from "@testing-library/react";
import Home from "../Home";
import { AllProviders } from '../../../testUtils';

describe("Home", () => {
	it("renders a headline", async () => {
		render(
			<AllProviders>
				<Home/>
			</AllProviders>
		);

		const findImageLeft = await screen.findByTestId('image-left');
		const findHeadline = await screen.findByText(/Login/i);
		const findImageRight = await screen.findByTestId('image-right');

		expect(findImageLeft).toBeInTheDocument();
		expect(findHeadline).toBeInTheDocument();
		expect(findImageRight).toBeInTheDocument();
	});
});