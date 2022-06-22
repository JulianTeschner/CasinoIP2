import React from 'react';
import { render, screen } from "@testing-library/react";
import Register from "../register";
import { AllProviders } from '../../../testUtils';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { URL_ENDPOINT } from '../../../config/env';

jest.mock("axios");

describe("Register", () => {

		const res = {
			"user": {
				'user.Username': 'Username',
				'user.FirstName': 'First',
				'user.LastName': 'Last',
				'user.Email': 'mail@mail.com',
				'user.DateOfBirth': '2000-01-01',
				'user.Address.Street': 'Street',
				'user.Address.city': 'City',
				'user.Address.State': 'State',
				'user.Address.Zip': '70172',
		  }
		};
	
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
		userEvent.type(findBirthday, '2000-01-01');
		userEvent.type(findEmail, 'mail@mail.com');
		userEvent.type(findUsername, 'Username');
		userEvent.type(findPassword, '1234');
		userEvent.type(findPasswordRepeat, '1234');
  
        expect(registerBtn).toBeInTheDocument();

        registerBtn.click();

		const text = await screen.findByText("First Name");

      	await expect(text).toBeInTheDocument();
      });
/*
	  it('should test axios success', async() =>{
		axios.post.mockResolvedValueOnce(res);
		render(
			<AllProviders>
				<Register/>
			</AllProviders>
		)
		
		expect(axios.post).toHaveBeenCalledWith(`${URL_ENDPOINT}`);
		//expect(result).toEqual(users);
	  });
*/	  
});


