import React from 'react';
import { render, screen } from "@testing-library/react";
import Overview from "../Overview";
import { AllProviders } from '../../../testUtils';

describe("Overview", () => {
	it("should render the Overview", async () => {
		render(
			<AllProviders>
				<Overview/>
			</AllProviders>
		);

		const findTitle = await screen.findByText(/Overview/i);
		const findSubTitle = await screen.findByText(/Games/i);

		const findBlackjack = await screen.findByText(/Blackjack/i);
		const findSlotmachine = await screen.findByText(/Slotmachine/i);

		const findBlackjackImage = screen.getAllByAltText('blackjack');
		const findSlotmachineImage = screen.getAllByAltText('slotmachine');

		expect(findTitle).toBeInTheDocument();
		expect(findSubTitle).toBeInTheDocument();
		expect(findBlackjack).toBeInTheDocument();
		expect(findSlotmachine).toBeInTheDocument();
		//expect(findBlackjackImage).toHaveAttribute('src', './images/blackjack.jpg');
		//expect(findSlotmachineImage).toHaveAttribute('src','./images/slotmachine.jpg');
	});
});