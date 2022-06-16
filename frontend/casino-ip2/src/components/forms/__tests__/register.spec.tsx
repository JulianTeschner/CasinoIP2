import React from 'react';
import { render, screen } from "@testing-library/react";
import Register from "../register";
import { AllProviders } from '../../../testUtils';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock("axios");

describe("Register", () => {
	const res = {
		"user": {
			"Username": 'Test',
			"FirstName": 'First',
			"LastName": 'Last',
			"DateOfBirth": "2022-01-01",
	  }
	};
	  
	axios.mockResolvedValue({ data: res,
	  status: 200,
	  statusText: "OK",
	  headers: {},
	  config: {},
	});
	
	it("renders the form for the register process", async () => {
		render(
			<AllProviders>
				<Register/>
			</AllProviders>
		);

		const findHeadline = await screen.findByTestId('register-h1');
        const findFirstname = await screen.findByText('First Name');
		const findLastname = await screen.findByText('Last Name');
		const findStreet = await screen.findByText('Street');
		const findZip = await screen.findByText('ZIP');
		const findState = await screen.findByText('State');
        const findBirthday = await screen.findByText('Day of birth');
		const findEmail = await screen.findByText('E-Mail');
		const findUsername = await screen.findByText('Username');
		const findPassword = await screen.findByText('Password');
        const findPasswordRepeat = await screen.findByText('Confirm Password');
		const btn = await screen.findByTestId('register-btn');
		
		expect(findHeadline).toBeInTheDocument();
        expect(findFirstname).toBeInTheDocument();
		expect(findLastname).toBeInTheDocument();
		expect(findStreet).toBeInTheDocument();
        expect(findZip).toBeInTheDocument();
        expect(findState).toBeInTheDocument();
		expect(findBirthday).toBeInTheDocument();
		expect(findEmail).toBeInTheDocument();
		expect(findUsername).toBeInTheDocument();
		expect(findPassword).toBeInTheDocument();
        expect(findPasswordRepeat).toBeInTheDocument();
		expect(btn).toBeInTheDocument();
	});

	it('should handle submit error', async () => {
		axios.mockRejectedValue({});
        render(
        	<AllProviders>
				<Register/>
		    </AllProviders>          
        );
  
		const findHeadline = await screen.findByTestId('register-h1');
        const findFirstname = await screen.findByLabelText('First Name');
		const findLastname = await screen.findByLabelText('Last Name');
		const findStreet = await screen.findByLabelText('Street');
		const findZip = await screen.findByLabelText('ZIP');
		const findState = await screen.findByLabelText('State');
        const findBirthday = await screen.findByLabelText('Day of birth');
		const findEmail = await screen.findByLabelText('E-Mail');
		const findUsername = await screen.findByLabelText('Username');
		const findPassword = await screen.findByLabelText('Password');
        const findPasswordRepeat = await screen.findByLabelText('Confirm Password');
		
        const registerBtn = await screen.findByTestId('register-btn');

		userEvent.type(findFirstname, 'First');
		userEvent.type(findLastname, 'Last');
		userEvent.type(findStreet, 'Street');
		userEvent.type(findZip, '70172');
		userEvent.type(findState, 'State');
		userEvent.type(findBirthday, '1990-01-01');
		userEvent.type(findEmail, 'mail@mail.de');
		userEvent.type(findUsername, 'Test');
		userEvent.type(findPassword, '1234');
		userEvent.type(findPasswordRepeat, '1234');
  
        expect(registerBtn).toBeInTheDocument();

        registerBtn.click();

		const text = await screen.findByText("First Name");

      	await expect(text).toBeInTheDocument();
      });
});


