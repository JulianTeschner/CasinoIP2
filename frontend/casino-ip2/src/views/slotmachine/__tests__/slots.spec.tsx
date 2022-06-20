import React from 'react';
import { render, screen } from "@testing-library/react";
import Slotmachine from "../SlotmachineView";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';
import axios from "axios";

jest.mock("axios");


describe("Slotmachine game", () => {

	beforeEach(() => {
		const res = {
			"balance": {
			  "Amount": 100,
			  "LastDeposit": 50
		  }};
		  
		  axios.mockResolvedValue({ data: res,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });
	})

	it("renders the Slotmachine game", async () => {    
    render(<Slotmachine/>);
		
		const balance = await screen.findByTestId('balance');
		const betform = await screen.findByTestId('bet-form');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '10');

		expect((input as HTMLInputElement).value).toBe('10');
		expect(balance).toBeInTheDocument();
		expect(betform).toBeInTheDocument();		
	});

	it("tests the 'bet and play' button", async () => {    
    render(<Slotmachine/>);
		
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
    render(<Slotmachine/>);

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
    render(<Slotmachine/>);

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
		render(<Slotmachine/>);
		
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
		render(<Slotmachine/>);
		const snapshot = renderer.create(<Slotmachine/>).toJSON();

		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '0');
		userEvent.click(btnplay);

		expect(snapshot).toMatchSnapshot();
	})

	it('nothing should happen if input greater than balance', async() => {
		render(<Slotmachine/>);
		const snapshot = renderer.create(<Slotmachine/>).toJSON();
		
		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '999');
		userEvent.click(btnplay);

		expect(snapshot).toMatchSnapshot();
	})

	it('should test hit button', async() => {
		render(<Slotmachine/>);
		
		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '10');
		userEvent.click(btnplay);
					
		const btnhit = await screen.findByTestId('hit');

		userEvent.click(btnhit);

		expect(btnhit).toBeInTheDocument();
	})

});