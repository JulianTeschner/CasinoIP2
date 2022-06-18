import { render } from "@testing-library/react";
import { AllProviders } from "../../../testUtils";
import AboutUsRoutes from "../AboutUs.routes";

describe("AboutUsRoutes", () => {
	it("it should render the about us routes", async () => {
		render(
			<AllProviders>
				<AboutUsRoutes/>
			</AllProviders>
		);
    });
});