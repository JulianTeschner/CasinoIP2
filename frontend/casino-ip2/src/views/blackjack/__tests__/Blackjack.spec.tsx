import React from 'react';
import { render, screen } from "@testing-library/react";
import Blackjack from "../Blackjack";
import renderer from 'react-test-renderer';


describe("blackjack game", () => {
	it("renders the blackjack game", async () => {
		render(<Blackjack/>);


		const page = renderer.create(<Blackjack/>);
		const balance = await screen.findByTestId('balance');
		const betform = await screen.findByTestId('bet-form');

		expect(page).toMatchSnapshot();
		expect(balance).toBeInTheDocument();
		expect(betform).toBeInTheDocument();
		
	});
});