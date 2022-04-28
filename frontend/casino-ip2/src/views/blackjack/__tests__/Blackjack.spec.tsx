import React from 'react';
import { render, screen } from "@testing-library/react";
import Blackjack from "../Blackjack";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';

describe("blackjack game", () => {

	it("renders the blackjack game", async () => {
		render(<Blackjack/>);
		
		const balance = await screen.findByTestId('balance');
		const betform = await screen.findByTestId('bet-form');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '10');

		expect((input as HTMLInputElement).value).toBe('10');
		expect(balance).toBeInTheDocument();
		expect(betform).toBeInTheDocument();		
	});

	it("tests the 'bet and play' button", async () => {
		render(<Blackjack/>);

		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '10');
		userEvent.click(btnplay);
		
		const btnhit = await screen.findByTestId('hit');				
		const btnstand = await screen.findByTestId('stay');
		
		expect(btnstand).toBeInTheDocument();
		expect(btnhit).toBeInTheDocument();
	});

	it('should the player and dealers hand', async () => {
		render(<Blackjack/>);

		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '10');
		userEvent.click(btnplay);
		
		const overlayPlayer = await screen.findByTestId('overlay-player');
		const overlayDealer = await screen.findByTestId('overlay-dealer');
		const status = await screen.findByTestId('msg');

		expect(status).toBeInTheDocument();
		expect(overlayPlayer).toBeInTheDocument();
		expect(overlayDealer).toBeInTheDocument();
	});

	it('should render a status msg if game won or lost', async () => {
		render(<Blackjack/>);

		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '10');
		userEvent.click(btnplay);
					
		const btnstand = await screen.findByTestId('stay');

		userEvent.click(btnstand);

		const status = await screen.findByTestId('msg');

		expect(status).toBeInTheDocument();
	});

	it('should not render overlay', async () => {
		render(<Blackjack/>);
		
		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '10');
		userEvent.click(btnplay);
					
		const btnstand = await screen.findByTestId('stay');

		userEvent.click(btnstand);

		const btnnew = await screen.findByTestId('new');

		userEvent.click(btnnew);

		expect(btnnew).not.toBeInTheDocument();
	});

	it('nothing should happen if input 0', async() => {
		render(<Blackjack/>);
		const snapshot = renderer.create(<Blackjack/>).toJSON();

		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '0');
		userEvent.click(btnplay);

		expect(snapshot).toMatchSnapshot();
	})

	it('nothing should happen if input greater than balance', async() => {
		render(<Blackjack/>);
		const snapshot = renderer.create(<Blackjack/>).toJSON();
		
		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '999');
		userEvent.click(btnplay);

		expect(snapshot).toMatchSnapshot();
	})

	it('should test hit button', async() => {
		render(<Blackjack/>);
		
		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '10');
		userEvent.click(btnplay);
					
		const btnhit = await screen.findByTestId('hit');

		userEvent.click(btnhit);

		expect(btnhit).toBeInTheDocument();
	})

});