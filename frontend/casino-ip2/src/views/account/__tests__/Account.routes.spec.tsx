import { render } from "@testing-library/react";
import { AllProviders } from "../../../testUtils";
import AccountRoutes from "../Account.routes";

describe("AccountRoutes", () => {
	it("it should render the account routes", async () => {
		render(
			<AllProviders>
				<AccountRoutes/>
			</AllProviders>
		);
    });
});