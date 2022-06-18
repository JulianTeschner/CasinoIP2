import { render } from "@testing-library/react";
import { AllProviders } from "../../testUtils";
import { ThemeProviderOwn } from "../theme-provider";

describe("ThemeProviderOwn", () => {
	it("it should render the new Theme Provider", async () => {
		render(
			<AllProviders>
				<ThemeProviderOwn/>
			</AllProviders>
		);
    });
});