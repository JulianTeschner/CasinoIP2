import RootRoutes from "./routes/root.routes";
import './App.less';
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "./themes/default";

function App() {
  return (
   <div className="App">
     <ThemeProvider theme={defaultTheme}>
       <RootRoutes />
     </ThemeProvider>
   </div>
  );
}

export default App;
