import React from 'react';
import { render, screen } from "@testing-library/react";
import Register from "../register";

describe("Register", () => {
	it("renders the form for the register process", async () => {
		render(<Register/>);

		const findHeadline = await screen.findByText(/Register/i);
        const findName = await screen.findByText(/Name/i);
        const findBirthday = await screen.findByText(/Birthday/i);
		const findUsername = await screen.findByText(/Username/i);
		const findPassword = await screen.findByText(/Password/i);
        const findPasswordRepeat = await screen.findByText(/Repeat Password/i);
		
		expect(findHeadline).toBeInTheDocument();
        expect(findBirthday).toBeInTheDocument();
        expect(findName).toBeInTheDocument();
		expect(findUsername).toBeInTheDocument();
		expect(findPassword).toBeInTheDocument();
        expect(findPasswordRepeat).toBeInTheDocument();
	});
});

describe("Register", () => {
	it("render the form for the register process - check types", async () => {
		render(<Register/>);

        const inputName = await screen.getByTestId("register-name");
        const inputBirthday = await screen.getByTestId("register-birthday");
		const inputUsername = await screen.getByTestId("register-username");
		const inputPassword = await screen.getByTestId("register-password");
        const inputPasswordRepeat = await screen.getByTestId("register-password-repeat");
		const button = await screen.getByRole("button", { name: 'Submit' });

        expect(inputName).toHaveAttribute("type", "text");
        expect(inputBirthday).toHaveAttribute("type", "date");
		expect(inputUsername).toHaveAttribute("type", "text");
		expect(inputPassword).toHaveAttribute("type", "password");
        expect(inputPasswordRepeat).toHaveAttribute("type", "password");
		expect(button).toBeInTheDocument();
	});
});

