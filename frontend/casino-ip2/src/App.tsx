import RootRoutes from "./routes/root.routes";
import './App.less';
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "./themes/default";
import WinLoss from "./views/winloss/WinLoss";

function App() {
  return (
    <WinLoss />	
  );
}

export default App;