import React from 'react';
import { render, screen } from "@testing-library/react";
import Overview from "../Overview";
import { AllProviders } from '../../../testUtils';
import userEvent from '@testing-library/user-event';

describe("Overview", () => {
	it("should render the Overview", async () => {
		render(
			<AllProviders>
				<Overview/>
			</AllProviders>
		);

		const findTitle = await screen.findByText(/Overview/i);
		const findSubTitle = await screen.findByText(/Games/i);

		const findBlackjackCard = await screen.findByTestId('blackjack-card');
		const findSlotmachineCard = await screen.findByTestId('slotmachine-card');

		const findBlackjack = await screen.findByText(/Blackjack/i);
		const findSlotmachine = await screen.findByText(/Slotmachine/i);

		const findBlackjackImage = screen.getByAltText('blackjack');
		const findSlotmachineImage = screen.getByAltText('slotmachine');

		expect(findTitle).toBeInTheDocument();
		expect(findSubTitle).toBeInTheDocument();
		expect(findBlackjack).toBeInTheDocument();
		expect(findSlotmachine).toBeInTheDocument();

		expect(findBlackjackCard).toBeInTheDocument();
		expect(findSlotmachineCard).toBeInTheDocument();
		expect(findBlackjackCard).toHaveAttribute('height', '260px');
		expect(findSlotmachineCard).toHaveAttribute('height', '260px');
		
		expect(findBlackjackImage).toHaveAttribute('src', 'blackjack.jpg');
		expect(findSlotmachineImage).toHaveAttribute('src','slotmaschine.jpg');
	});

	it("should navigate to blackjack", async () =>{
		render(
			<AllProviders>
				<Overview/>
			</AllProviders>
		);

		const blackjackLink = screen.getByTestId('blackjack-link');

		userEvent.click(blackjackLink);

		const blackJackHeadline = await screen.findByText(/Blackjack/i);

		expect(blackJackHeadline).toBeInTheDocument();

	});

	it("should navigate to slotmachine", async () =>{
		render(
			<AllProviders>
				<Overview/>
			</AllProviders>
		);

		const slotmachineLink = screen.getByTestId('slotmachine-link');

		userEvent.click(slotmachineLink);

		const slotmachineHeadline = await screen.findByText(/Slotmachine/i);
		
		expect(slotmachineHeadline).toBeInTheDocument();

	});

	it("should navigate to sportbet", async () =>{
		render(
			<AllProviders>
				<Overview/>
			</AllProviders>
		);

		const sportbetLink = screen.getByTestId('sportbet-link');

		userEvent.click(sportbetLink);

		const sportbetHeadline = await screen.findByText(/Sportbet/i);
		
		expect(sportbetHeadline).toBeInTheDocument();

	});
});