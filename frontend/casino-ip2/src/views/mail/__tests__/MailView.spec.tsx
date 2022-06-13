import { render, screen } from "@testing-library/react";
import { AllProviders } from "../../../testUtils";
import Mail from "../MailView";

describe("Mail", () => {
	it("it should render the mail support", async () => {
		render(
			<AllProviders>
				<Mail/>
			</AllProviders>
		);

        const nav = await screen.findByText('Mail Support');
        const btn = await screen.findByRole("button", {name: /Mail Support/i});

        expect(nav).toBeInTheDocument();
        expect(btn).toBeInTheDocument();

        btn.click();

        const text = await screen.findByText("Here you can write an email to our support team");
        const from = await screen.findByTestId("from-name");
        const message = await screen.findByTestId("message");
        const reply = await screen.findByTestId("reply-mail");
        const submit = await screen.findByTestId("mail-submit");

        expect(text).toBeInTheDocument();
        expect(from).toBeInTheDocument();
        expect(message).toBeInTheDocument();
        expect(reply).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
    });
}); 