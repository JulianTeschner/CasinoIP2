import React from 'react';
import { render, screen } from "@testing-library/react";
import Sportbet from "../Sportbet";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';
import axios from "axios";

jest.mock("axios");

describe("sportbet game", () => {

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

    it("renders the sportbet game reject", async () => {   
        axios.mockRejectedValue({}); 
        render(<Sportbet/>);
		
        const amount = await screen.findByTestId('type-amount');
        const home = await screen.findByTestId('type-home');
        const away = await screen.findByTestId('type-away');
        const btn = await screen.findByTestId('play');

		//expect((input as HTMLInputElement).value).toBe('10');
		userEvent.type(amount, "10");
        userEvent.type(home, "23");
        userEvent.type(away, "23");
        btn.click();

        const balance = await screen.findByTestId('type-amount');

        expect(balance).toBeInTheDocument();
	});

    it("should happen nothing if amount is 0", async () => {   
        render(<Sportbet/>);
        		
        const amount = await screen.findByTestId('type-amount');
        const home = await screen.findByTestId('type-home');
        const away = await screen.findByTestId('type-away');
        const btn = await screen.findByTestId('play');

		//expect((input as HTMLInputElement).value).toBe('10');
		userEvent.type(amount, "0");
        userEvent.type(home, "23");
        userEvent.type(away, "23");
        btn.click();

        const text = await screen.findByText('Min. bet amount 1 Credit')
                
		expect(text).toBeInTheDocument();
	});

    it('should happen nothing if amount is greater than balance', async() => {
		render(<Sportbet/>);
		
		const amount = await screen.findByTestId('type-amount');
        const home = await screen.findByTestId('type-home');
        const away = await screen.findByTestId('type-away');
        const btn = await screen.findByTestId('play');

		userEvent.type(amount, "999");
        userEvent.type(home, "23");
        userEvent.type(away, "23");
        btn.click();
        
		const text = await screen.findByText('Min. bet amount 1 Credit')
                
		expect(text).toBeInTheDocument();
	});


    it("renders the sportbet game status", async () => {    
        
        const mockSetGuthaben = jest.fn();

        jest.mock('react', () => ({
            useState: (guthaben:any) => [guthaben, mockSetGuthaben]
        }))
        
        render(<Sportbet/>);
        
        const amount = await screen.findByTestId('sport-amount');
        const home = await screen.findByTestId('sport-home');
        const away = await screen.findByTestId('sport-away');
        const btn = await screen.findByTestId('play');

		userEvent.type(amount, "10");
        userEvent.type(home, "23");
        userEvent.type(away, "23");
        btn.click();

        expect(mockSetGuthaben).toHaveBeenCalled;
	});

});