import { BrowserRouter } from "react-router-dom";
import NavRoutes from "./routes/Navroutes";

function App() {
  return (
    <BrowserRouter>
      <NavRoutes />
    </BrowserRouter>
  );
}

export default App;
