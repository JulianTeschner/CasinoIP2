import { render } from "@testing-library/react";
import { AllProviders } from "../../../testUtils";
import LogoutRoutes from "../Logout.routes";

describe("LogoutRoutes", () => {
	it("it should render the logout routes", async () => {
		render(
			<AllProviders>
				<LogoutRoutes/>
			</AllProviders>
		);
    });
});