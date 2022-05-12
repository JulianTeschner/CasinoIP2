import RootRoutes from "./routes/root.routes";
import './App.less';
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "./themes/default";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
       <RootRoutes />
     </ThemeProvider>
  );
}

export default App;