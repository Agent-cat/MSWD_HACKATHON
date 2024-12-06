import { BrowserRouter } from "react-router-dom";
import NavRoutes from "./routes/Navroutes";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <NavRoutes />
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
