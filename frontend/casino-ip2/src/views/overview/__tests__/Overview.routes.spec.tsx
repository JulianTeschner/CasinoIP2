import { render } from "@testing-library/react";
import { AllProviders } from "../../../testUtils";
import OverviewRoutes from "../Overview.routes";

describe("Overview", () => {
	it("it should render the overview routes", async () => {
		render(
			<AllProviders>
				<OverviewRoutes/>
			</AllProviders>
		);
    });
});