import React from 'react';
import { render, screen } from "@testing-library/react";
import SignIn from "../SignIn";

describe("SignIn", () => {
	it("renders the form for the sign-in process", async () => {
		render(<SignIn/>);

		const findHeadline = await screen.findByText(/Sign In/i);
		const findUsername = await screen.findByText(/Username/i);
		const findPassword = await screen.findByText(/Password/i);
		
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
		const button = await screen.getByRole("button", { name: 'Submit' });

		expect(inputUsername).toHaveAttribute("type", "text");
		expect(inputPassword).toHaveAttribute("type", "password");
		expect(button).toBeInTheDocument();
	});
});

