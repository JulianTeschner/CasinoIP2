import React from 'react';
import { render, screen } from "@testing-library/react";
import SignIn from "../signIn";

describe("SignIn", () => {
	it("renders the form for the sign-in process", async () => {
		render(<SignIn/>);

		const findHeadline = await screen.findByText(/Sign In/i);
		const findUsername = await screen.findByText('Username');
		const findPassword = await screen.findByText('Password');
		
		expect(findHeadline).toBeInTheDocument();
		expect(findUsername).toBeInTheDocument();
		expect(findPassword).toBeInTheDocument();
	});
});

describe("SignIn", () => {
	it("render the form for the sign-in process - check types", async () => {
		render(<SignIn/>);

		const inputUsername = await screen.getByTestId("signIn-username");
		const inputPassword = await screen.getByTestId("signIn-password");
		const buttonSubmit = await screen.getByRole("button", { name: 'Submit' });
		const buttonRegister = await screen.getByRole("button", { name: 'Register'});

		expect(inputUsername).toHaveAttribute("type", "text");
		expect(inputPassword).toHaveAttribute("type", "password");
		expect(buttonSubmit).toBeInTheDocument();
		expect(buttonRegister).toBeInTheDocument();
	});
});

