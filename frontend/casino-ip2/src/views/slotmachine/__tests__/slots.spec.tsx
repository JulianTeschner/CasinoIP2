import React from 'react';
import { render, screen } from "@testing-library/react";
import SlotmachineView from "../SlotmachineView";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';
import axios from "axios";

jest.mock("axios");


describe("slotmachine game", () => {

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

	it("renders the slotmachine", async () => {    
    render(<SlotmachineView/>);
		
		const balance = await screen.findByTestId('balance');
		const betform = await screen.findByTestId('bet-form');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '10');

		expect((input as HTMLInputElement).value).toBe('10');
		expect(balance).toBeInTheDocument();
		expect(betform).toBeInTheDocument();		
	});

	it("tests the 'bet and play' button", async () => {    
    render(<SlotmachineView/>);
		
		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '10');
		userEvent.click(btnplay);
		
		const btnhit = await screen.findByTestId('hit');				
		const btnstand = await screen.findByTestId('stay');
		
		expect(btnstand).toBeInTheDocument();
		expect(btnhit).toBeInTheDocument();
	});


	it('should render a status msg if game won or lost', async () => {    
    render(<SlotmachineView/>);

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
		render(<SlotmachineView/>);
		
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
		render(<SlotmachineView/>);
		const snapshot = renderer.create(<SlotmachineView/>).toJSON();

		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '0');
		userEvent.click(btnplay);

		expect(snapshot).toMatchSnapshot();
	})

	it('nothing should happen if input greater than balance', async() => {
		render(<SlotmachineView/>);
		const snapshot = renderer.create(<SlotmachineView/>).toJSON();
		
		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '999');
		userEvent.click(btnplay);

		expect(snapshot).toMatchSnapshot();
	})



});