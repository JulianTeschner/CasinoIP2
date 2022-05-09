import RootRoutes from "./routes/root.routes";
import './App.less';
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "./themes/default";
import Blackjack from "./views/blackjack/Blackjack";

function App() {
  return (
   <div className="App">
     <ThemeProvider theme={defaultTheme}>
       <Blackjack />
     </ThemeProvider>
   </div>
  );
}

export default App;