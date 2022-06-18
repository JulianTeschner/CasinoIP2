import { render } from "@testing-library/react";
import { AllProviders } from "../../testUtils";
import DarkTheme from "../dark-theme";

describe("DarkTheme", () => {
	it("it should render the dark theme", async () => {
		render(
			<AllProviders>
				<DarkTheme/>
			</AllProviders>
		);
    });
});