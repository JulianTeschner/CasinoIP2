import { render, screen } from "@testing-library/react";
import { AllProviders } from "../../testUtils";
import ProtectedLayout from "../ProtectedLayout";

jest.mock("../protected.routes", () => ({
  __esModule: true,
  default: () => "SignIn",
}));

describe("ProtectedLayout", () => {
  it("should render the layout", async () => {
    render(
      <AllProviders>
        <ProtectedLayout />
      </AllProviders>
    );
    const text = await screen.findByText("SignIn");
    expect(text).toBeInTheDocument();
  });
});