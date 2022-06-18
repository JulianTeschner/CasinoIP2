import RootRoutes from "./routes/root.routes";
import './App.less';
import { ThemeProviderOwn } from "./themes/theme-provider";

function App() {
  return (
   <div className="App">
      <ThemeProviderOwn>
        <RootRoutes />
      </ThemeProviderOwn>
   </div>
  );
}

export default App;