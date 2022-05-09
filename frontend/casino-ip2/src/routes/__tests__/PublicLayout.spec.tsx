import { render, screen } from "@testing-library/react";
import { AllProviders } from "../../testUtils";
import PublicLayout from "../PublicLayout";

jest.mock("../public.routes", () => ({
  __esModule: true,
  default: () => "Overview",
}));

describe("PublicLayout", () => {
  it("should render the layout", async () => {
    render(
      <AllProviders>
        <PublicLayout />
      </AllProviders>
    );
    const text = await screen.findByText("Overview");
    expect(text).toBeInTheDocument();
  });
});