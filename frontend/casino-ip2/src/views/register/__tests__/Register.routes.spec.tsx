import { render } from "@testing-library/react";
import { AllProviders } from "../../../testUtils";
import RegisterRoutes from "../Register.routes";

describe("Register", () => {
	it("it should render the register routes", async () => {
		render(
			<AllProviders>
				<RegisterRoutes/>
			</AllProviders>
		);
    });
});