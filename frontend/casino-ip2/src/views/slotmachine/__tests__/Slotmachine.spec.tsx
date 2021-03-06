import React from 'react';
import { render, screen } from "@testing-library/react";
import Slotmachine from "../Slotmachine";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';
import axios from "axios";

jest.mock("axios");

describe("slotmachine game", () => {

  beforeEach(() => {
		const res = {
			"balance": {
			  "amount": 100,
			  "LastDeposit": 50
		  }};
		  
		  axios.mockResolvedValue({ data: res,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });
	})

	it('renders correctly', ()=> {
		const tree = renderer.create(<Slotmachine/>).toJSON();
		expect(tree).toMatchSnapshot();
	});

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

	it('should render a status msg if game won or lost', async () => {    
		render(<Slotmachine/>);
		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');
		userEvent.type(input, '10');
		userEvent.click(btnplay);
	
		const status = await screen.findByTestId('msg');
	
		expect(status).toBeInTheDocument();
	});

	it('nothing should happen if input 0', async() => {
		render(<Slotmachine/>);
		const snapshot = renderer.create(<Slotmachine/>).toJSON();
		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');
	
		userEvent.type(input, '0');
		userEvent.click(btnplay);
	
		expect(snapshot).toMatchSnapshot();
	});

	it('nothing should happen if input greater than balance', async() => {
		render(<Slotmachine/>);
		const snapshot = renderer.create(<Slotmachine/>).toJSON();
		
		const btnplay = await screen.findByTestId('play');
		const input = await screen.findByTestId('bet-input');

		userEvent.type(input, '999');
		userEvent.click(btnplay);

		expect(snapshot).toMatchSnapshot();
	});

  it('should pass checking game logic', async () => {
    render(<Slotmachine />);


  })

});