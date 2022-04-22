import { render, screen } from "@testing-library/react";
import RequireAuth from "../RequireAuth";
import { AllProviders } from "../../../testUtils";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Navigate: () => <p>navigate</p>
}));

describe("RequireAuth", () => {
    it("Send to login if not logged in", async () => {
        render(
            <AllProviders>
                <RequireAuth isLoggedIn={false} />
            </AllProviders>
        );
        const headline = await screen.findByText(/navigate/i);
        expect(headline).toBeInTheDocument();
    });

    it("Should let us through if we are logged in", async () => {
    const spy = jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockImplementation(() => "asd");

    render(
      <AllProviders>
        <RequireAuth>
          <h1>Overview</h1>
        </RequireAuth>
      </AllProviders>
    );
    const headline = await screen.findByText(/Overview/i);
    expect(headline).toBeInTheDocument();
    spy.mockReset();
  });
})