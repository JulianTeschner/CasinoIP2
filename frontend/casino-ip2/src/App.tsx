import RootRoutes from "./routes/root.routes";
import './App.less';
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "./themes/default";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const themes = {
  dark: `${process.env.PUBLIC_URL}/style/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/style/light-theme.css`,
};

function App() {
  return (
   <div className="App">
     <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
      <ThemeProvider theme={defaultTheme}>
        <RootRoutes />
      </ThemeProvider>
     </ThemeSwitcherProvider>
   </div>
  );
}

export default App;