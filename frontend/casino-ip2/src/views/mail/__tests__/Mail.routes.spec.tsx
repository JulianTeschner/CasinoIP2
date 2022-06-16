import { render } from "@testing-library/react";
import { AllProviders } from "../../../testUtils";
import MailRoutes from "../Mail.routes";

describe("MailRoutes", () => {
	it("it should render the mail routes", async () => {
		render(
			<AllProviders>
				<MailRoutes/>
			</AllProviders>
		);
    });
});