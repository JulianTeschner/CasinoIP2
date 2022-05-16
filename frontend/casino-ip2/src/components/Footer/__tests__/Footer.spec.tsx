import { render } from "@testing-library/react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { AllProviders } from "../../../testUtils";
import Footer from "../Footer";

const themes = {
    dark: `${process.env.PUBLIC_URL}/style/dark-theme.css`,
    light: `${process.env.PUBLIC_URL}/style/light-theme.css`,
  };

describe("Footer", () => {
    it("render the footer", async () => {
        render(
            <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
                <AllProviders>
                    <Footer />
                </AllProviders>
            </ThemeSwitcherProvider>
        );
        //const footerText = await screen.getByText(/Internetprogrammierung Sommersemester 2022/i);
        //const toggleTheme = await screen.getByTestId("toggle-theme");

        //expect(footerText).toBeInTheDocument();
        //expect(toggleTheme).toBeInTheDocument();
    });
});