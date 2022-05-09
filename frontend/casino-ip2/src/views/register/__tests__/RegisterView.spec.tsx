import React from 'react';
import { render, screen } from "@testing-library/react";
import RegisterView from "../RegisterView";
import { AllProviders } from '../../../testUtils';

describe("RegisterView", () => {
	it("renders a headline", async () => {
		render(
			<AllProviders>
				<RegisterView/>
			</AllProviders>
		);

		const findHeadline = await screen.findByText(/Register/i);

		expect(findHeadline).toBeInTheDocument();
	});

	
});