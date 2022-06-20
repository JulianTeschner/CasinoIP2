import React from 'react';
import { render, screen } from "@testing-library/react";
import SotmachineView from "../SlotmachineView";
import { AllProviders } from '../../../testUtils';

describe("SotmachineView", () => {
	it("renders a headline", async () => {
		render(
			<AllProviders>
				<SotmachineView/>
			</AllProviders>
		);

		const findHeadline = await screen.findByText(/Slotmachine/i);

		expect(findHeadline).toBeInTheDocument();
	});

	
});