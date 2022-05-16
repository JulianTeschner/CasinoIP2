import { render, screen } from "@testing-library/react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { AllProviders } from "../../testUtils";
import ProtectedLayout from "../ProtectedLayout";

jest.mock("../protected.routes", () => ({
  __esModule: true,
  default: () => "SignIn",
}));

const themes = {
  dark: `${process.env.PUBLIC_URL}/style/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/style/light-theme.css`,
};

describe("ProtectedLayout", () => {
  it("should render the layout", async () => {
    render(
      <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
        <AllProviders>
          <ProtectedLayout />
        </AllProviders>
      </ThemeSwitcherProvider>
      
    );
    //const text = await screen.findByText("SignIn");
    //expect(text).toBeInTheDocument();
  });
});