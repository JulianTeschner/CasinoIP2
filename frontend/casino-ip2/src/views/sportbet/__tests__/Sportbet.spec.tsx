import React from 'react';
import { render, screen } from "@testing-library/react";
import Sportbet from "../Sportbet";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';
import axios from "axios";

jest.mock("axios");

describe("blackjack game", () => {

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

	it("renders the sportbet game", async () => {    
        render(<Sportbet/>);
		
		const balance = await screen.findByTestId('balance');
		const betform = await screen.findByTestId('bet-form');
        const amount = await screen.findByTestId('sport-amount');
        const home = await screen.findByTestId('sport-home');
        const away = await screen.findByTestId('sport-away');
        const btn = await screen.findByTestId('play');

		expect(balance).toBeInTheDocument();
		expect(betform).toBeInTheDocument();		
        expect(amount).toBeInTheDocument();
        expect(home).toBeInTheDocument();
		expect(away).toBeInTheDocument();		
        expect(btn).toBeInTheDocument();
	});
/*
    it("renders the sportbet game status", async () => {    
        render(<Sportbet/>);

        const setGuthaben = jest.fn();
          
        const amount = await screen.findByTestId('sport-amount');
        const home = await screen.findByTestId('sport-home');
        const away = await screen.findByTestId('sport-away');
        const btn = await screen.findByTestId('play');

		userEvent.type(amount, "10");
        userEvent.type(home, "23");
        userEvent.type(away, "23");
        btn.click();

        expect(setGuthaben).toBeCalled();
	});
*/
    it("renders the sportbet game reject", async () => {   
        axios.mockRejectedValue({}); 
        render(<Sportbet/>);
		
        const amount = await screen.findByTestId('sport-amount');
        const home = await screen.findByTestId('sport-home');
        const away = await screen.findByTestId('sport-away');
        const btn = await screen.findByTestId('play');

		//expect((input as HTMLInputElement).value).toBe('10');
		userEvent.type(amount, "10");
        userEvent.type(home, "23");
        userEvent.type(away, "23");
        btn.click();

        const balance = await screen.findByTestId('balance');

        expect(balance).toBeInTheDocument();
	});
/*
    it("should happen nothing if amount is 0", async () => {   
        render(<Sportbet/>);
        
        const snapshot = renderer.create(<Sportbet/>).toJSON();
		
        const amount = await screen.findByTestId('sport-amount');
        const home = await screen.findByTestId('sport-home');
        const away = await screen.findByTestId('sport-away');
        const btn = await screen.findByTestId('play');

		//expect((input as HTMLInputElement).value).toBe('10');
		userEvent.type(amount, "0");
        userEvent.type(home, "23");
        userEvent.type(away, "23");
        btn.click();
        
        const balance = await screen.findByTestId('balance');
        
		expect(snapshot).toMatchSnapshot();
	});
*/

});