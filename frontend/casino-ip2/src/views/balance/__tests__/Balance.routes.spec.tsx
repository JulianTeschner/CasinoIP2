import { render } from "@testing-library/react";
import { AllProviders } from "../../../testUtils";
import BalanceRoutes from "../Balance.routes";

describe("BalanceRoutes", () => {
	it("it should render the balance routes", async () => {
		render(
			<AllProviders>
				<BalanceRoutes/>
			</AllProviders>
		);
    });
});