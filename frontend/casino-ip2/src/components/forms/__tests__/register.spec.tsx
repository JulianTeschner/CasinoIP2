import React from 'react';
import { render, screen } from "@testing-library/react";
import Register from "../register";

describe("Register", () => {
	it("renders the form for the register process", async () => {
		render(<Register/>);

		const findHeadline = await screen.findByTestId('register-h1');
        const findFirstname = await screen.findByText('First Name');
		const findLastname = await screen.findByText('Last Name');
		const findStreet = await screen.findByText('Street');
		const findZip = await screen.findByText('ZIP');
		const findState = await screen.findByText('State');
        const findBirthday = await screen.findByText('Day of birth');
		const findEmail = await screen.findByText('E-Mail');
		const findPassword = await screen.findByText('Password');
        const findPasswordRepeat = await screen.findByText('Confirm Password');
		const btn = await screen.findByTestId('register-btn')
		
		expect(findHeadline).toBeInTheDocument();
        expect(findFirstname).toBeInTheDocument();
		expect(findLastname).toBeInTheDocument();
		expect(findStreet).toBeInTheDocument();
        expect(findZip).toBeInTheDocument();
        expect(findState).toBeInTheDocument();
		expect(findBirthday).toBeInTheDocument();
		expect(findEmail).toBeInTheDocument();
		expect(findPassword).toBeInTheDocument();
        expect(findPasswordRepeat).toBeInTheDocument();
		expect(btn).toBeInTheDocument();
	});
});


