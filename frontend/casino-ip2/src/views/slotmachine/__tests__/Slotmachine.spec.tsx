import React from 'react';
import { render, screen } from "@testing-library/react";
import Slotmachine from "../Slotmachine";
import { AllProviders } from '../../../testUtils';

describe("Slotmachine", () => {
	it("renders a headline", async () => {
		render(
			<AllProviders>
				<Slotmachine/>
			</AllProviders>
		);

		const findHeadline = await screen.findByText(/Slotmachine/i);

		expect(findHeadline).toBeInTheDocument();
	});


    
	
});