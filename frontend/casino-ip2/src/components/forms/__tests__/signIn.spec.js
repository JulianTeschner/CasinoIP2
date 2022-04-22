import { render, screen } from "@testing-library/react";
import SignIn from "../signIn";
import userEvent from "@testing-library/user-event";
import { AllProviders } from "../../../testUtils";
import auth0 from "../../../config/auth0";

describe("SignIn", () => {
	it("should enable a user login", async () => {
		const spy = jest
			.spyOn(auth0.client, "login")
			.mockImplementation((values, cb) => cb(null, { accessToken: "123" }));

		render(
			<AllProviders>
				<SignIn/>
			</AllProviders>
		);
		
		const headline = await screen.findByText(/Sign In/i);
		const username = await screen.findAllByLabelText(/Username/i);
		const password = await screen.findAllByLabelText(/Password/i);
		const submit = await screen.findByRole("button", { name: /submit/i });
		const registerFirst = await screen.findByRole("button", { name: /register first/i });
		const text = await screen.findByText(/SignIn successful/i);

		expect(headline).toBeInTheDocument();
		userEvent.type(username, "test");
		userEvent.type(password, "test");
		userEvent.click(submit);
		userEvent.click(registerFirst);

		expect(spy).toHaveBeenCalled();
		expect(text).toBeInTheDocument();
		spy.mockRestore();
	});

	it("should show an error if sign in failed", async () => {
		const spy = jest
			.spyOn(auth0.client, "login")
			.mockImplementation((values, cb) =>({ description: "NEIN" }));

		render(
			<AllProviders>
				<SignIn />
			</AllProviders>
		);

		const headline = await screen.findByText(/Sign In/i);
		const username = await screen.findAllByLabelText(/Username/i);
		const password = await screen.findAllByLabelText(/Password/i);
		const submit = await screen.findByRole("button", { name: /submit/i });
		const registerFirst = await screen.findByRole("button", { name: /register first/i });
		const text = await screen.findByText(/SignIn failed: NEIN/i);

		expect(headline).toBeInTheDocument();
		userEvent.type(username, "test");
		userEvent.type(password, "test");
		userEvent.click(submit);
		userEvent.click(registerFirst);

		expect(spy).toHaveBeenCalled();
		expect(text).toBeInTheDocument();
		spy.mockRestore();		
	});

});





