import React from 'react';
import { render, screen } from "@testing-library/react";
import Register from "../Slotmachine";
import { AllProviders } from '../../../testUtils';

describe("Register", () => {
	it("renders a headline", async () => {
		render(
			<AllProviders>
				<Register/>
			</AllProviders>
		);

		const findHeadline = await screen.findByText(/Register/i);

		expect(findHeadline).toBeInTheDocument();
	});


    
	
});