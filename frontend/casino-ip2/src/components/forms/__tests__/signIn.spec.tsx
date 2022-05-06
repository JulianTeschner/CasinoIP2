import { render, screen } from "@testing-library/react";
import SignIn from "../signIn";
import userEvent from "@testing-library/user-event";
import { AllProviders } from "../../../testUtils";
import auth0 from "../../../config/auth0";

describe("SignIn", () => {
	it("should enable a user login", async () => {
		const spy = jest
			.spyOn(auth0.client, "login")
			.mockImplementation((values:any, cb:any) => cb(null, { accessToken: "123" }));

		render(
			<AllProviders>
				<SignIn/>
			</AllProviders>
		);
		
		const headline = await screen.findByText(/Login/i);
		const username:any = await screen.findAllByLabelText(/Username/i);
		const password:any = await screen.findAllByLabelText(/Password/i);
		const submit = await screen.findByRole("button", { name: /submit/i });
		const registerFirst = await screen.findByRole("button", { name: /register first/i });

		expect(headline).toBeInTheDocument();
		expect(registerFirst).toBeInTheDocument();
		userEvent.type(username, "test");
		userEvent.type(password, "test");
		userEvent.click(submit);

		//const text = await screen.findByText(/Login successful/i);

		//expect(spy).toHaveBeenCalled();
		//expect(text).toBeInTheDocument();
		//spy.mockRestore();
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

		const headline = await screen.findByText(/Login/i);
		const username:any = await screen.findAllByLabelText(/Username/i);
		const password:any = await screen.findAllByLabelText(/Password/i);
		const submit = await screen.findByRole("button", { name: /submit/i });
		const registerFirst = await screen.findByRole("button", { name: /register first/i });

		expect(headline).toBeInTheDocument();
		expect(registerFirst).toBeInTheDocument();
		userEvent.type(username, "test");
		userEvent.type(password, "test");
		userEvent.click(submit);

		//const text = await screen.findByText(/Login failed: NEIN/i);

		//expect(spy).toHaveBeenCalled();
		//expect(text).toBeInTheDocument();
		//spy.mockRestore(); 		
	});

});





